import React from 'react';
import ModaqHome from '../../../../lib/modaq/ModaqHome';
import Head from 'next/head';
import { prisma } from '../../../../lib/db'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

function RoomHome({ roomId, tournamentName, tournamentId, tournamentLocation, round, roundNum}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (tournamentId === null || roomId === null || round === null) {
        // error with routing
        return null;
    }
    else if (tournamentName === null) {
        return <div>Room {roomId} does not exist for tournament with id {tournamentId}</div>
    }
    else if (roundNum === NaN) {
        return <div>Round {round} does not exist in room {roomId} for {tournamentName}</div>
    }
    return <>
        <Head>
            <title>Room {roomId}@{tournamentId}: Round {roundNum} </title>
        </Head>
        <ModaqHome id={tournamentId + "#" + roomId} />
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
                        tournamentLocation: null,
                        round: null
                    }
                }
            }
            //TODO: check for bounded round number
            if (context.params?.round !== undefined && typeof (context.params?.round) !== 'object') {
                const round: string = context.params.round;
                // tournamentData will always be at most a singleton since id is unique
                return {
                    props: {
                        roomId: roomId,
                        tournamentName: tournamentData[0].name,
                        tournamentId: tournamentId,
                        tournamentLocation: tournamentData[0].location,
                        round: round,
                        roundNum: parseInt(round)
                    }
                }
            }
            else {
                return {
                    props: {
                        roomId: roomId,
                        tournamentName: null,
                        tournamentId: tournamentId,
                        tournamentLocation: null,
                        round: null,
                        roundNum: null
                    }
                }
            }
        }
        else {
            return {
                props: {
                    roomId: null,
                    tournamentName: null,
                    tournamentId: tournamentId,
                    tournamentLocation: null,
                    round: null,
                    roundNum: null
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
                tournamentLocation: null,
                round: null,
                roundNum: null
            }
        }
    }
}
export default RoomHome;
