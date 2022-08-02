import React from 'react';
import ModaqHome from '../../../../lib/modaq/ModaqHome';
import { useRouter } from 'next/router';

function RoomHome() {
    const router = useRouter();

    //TODO: Replace with database/API call
    const { room_id, tournament_id } = router.query

    if (tournament_id !== undefined && typeof (tournament_id) !== 'object' && room_id !== undefined && typeof (room_id) !== 'object')
        return <ModaqHome id={tournament_id + "#" + room_id} />
    else
        return <div>Room {room_id} for tournament {tournament_id} does not exist</div>
}

export default RoomHome
