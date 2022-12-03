import React from 'react';
import ModaqHome from '../../../../lib/modaq/ModaqHome';
import Head from 'next/head';
import { prisma } from '../../../../lib/db'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Stack } from '@fluentui/react';

function RoomHome({ roomId, tournamentName, tournamentId, tournamentLocation }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    if (tournamentId === null || roomId === null) {
        // error with routing
        return null;
    }
    else if (tournamentName === null) {
        return <div>Room {roomId} does not exist for tournament with id {tournamentId}</div>
    }
    return <>
        <Head>
            <title>Room {roomId}: {tournamentId}</title>
        </Head>
        <Stack>
            <ul>
                
            </ul>
        </Stack>
    </>
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.params?.tournamentId !== undefined && typeof (context.params?.tournamentId) !== 'object') {
        const tournamentId: string = context.params.tournamentId;
        if (context.params?.roomId !== undefined && typeof (context.params?.roomId) !== 'object') {
            const roomId: string = context.params.roomId;

            // TODO: figure out type annotations
            const tournamentData = await prisma.tournament.findMany({
                where: {
                    id: tournamentId,
                    rooms: {
                        has: roomId
                    }
                }
            });

            if (tournamentData.length === 0) {
                return {
                    props: {
                        roomId: roomId,
                        tournamentName: null,
                        tournamentId: tournamentId,
                        tournamentLocation: null
                    }
                }
            }
            // tournamentData will always be at most a singleton since id is unique
            return {
                props: {
                    roomId: roomId,
                    tournamentName: tournamentData[0].name,
                    tournamentId: tournamentId,
                    tournamentLocation: tournamentData[0].location
                }
            }
        }
        else {
            return {
                props: {
                    roomId: null,
                    tournamentName: null,
                    tournamentId: tournamentId,
                    tournamentLocation: null
                }
            }
        }
    }
    else {
        return {
            props: {
                roomId: null,
                tournamentName: null,
                tournamentId: null,
                tournamentLocation: null
            }
        }
    }
}
export default RoomHome;
