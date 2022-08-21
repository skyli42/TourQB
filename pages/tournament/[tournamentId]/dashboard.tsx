import React from 'react';
import TDHome from '../../../lib/components/TDHome';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { prisma } from '../../../lib/db'


function TDDashboard({ rooms, tournamentId, tournamentName, tournamentLocation }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (tournamentId !== null && tournamentName !== null) {
        return <>
            <Head>
                <title>{tournamentName} Dashboard</title>
            </Head>
            <TDHome tournamentLocation={tournamentLocation} tournamentName={tournamentName} tournamentId={tournamentId} rooms={rooms} />
        </>
    }
    else if (tournamentId !== null) {
        return <div>Tournament {tournamentId} is invalid</div>
    }
    else {
        return <div>Tournament {tournamentId} does not exist</div>
    }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.params?.tournamentId !== undefined && typeof (context.params?.tournamentId) !== 'object') {
        const tournamentId: string = context.params.tournamentId;
        // TODO: figure out type annotations
        const tournamentData = await prisma.tournament.findUnique({
            where: {
                id: tournamentId
            }
        });
        if (tournamentData === null) {
            return {
                props: {
                    rooms: null,
                    tournamentName: null,
                    tournamentId: tournamentId,
                    tournamentLocation: null
                }
            }
        }
        return {
            props: {
                rooms: tournamentData.rooms,
                tournamentName: tournamentData.name,
                tournamentId: tournamentId,
                tournamentLocation: tournamentData.location
            }
        }
    }
    else {
        return {
            props: {
                rooms: null,
                tournamentName: null,
                tournamentId: null,
                tournamentLocation: null
            }
        }
    }

}
export default TDDashboard;