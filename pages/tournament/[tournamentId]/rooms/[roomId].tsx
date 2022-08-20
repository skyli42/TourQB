import React from 'react';
import ModaqHome from '../../../../lib/modaq/ModaqHome';
import { useRouter } from 'next/router';
import Head from 'next/head';
function RoomHome() {
    const router = useRouter();

    //TODO: Replace with database/API call
    const { roomId, tournamentId } = router.query

    if (tournamentId !== undefined && typeof (tournamentId) !== 'object' && roomId !== undefined && typeof (roomId) !== 'object') {
        return <>
            <Head>
                <title>Room {roomId}: {tournamentId}</title>
            </Head>
            <ModaqHome id={tournamentId + "#" + roomId} />
        </>
    }
    else {
        return null;
    }
}
export default RoomHome
