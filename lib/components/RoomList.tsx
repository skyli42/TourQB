import React from 'react';
import Link from 'next/link';

function RoomList(props: IRoomListProps) {

    const rooms = props.roomIds.map((id)=>
        <li key={id}><Link href={`/tournament/${props.tournamentId}/rooms/${id}`}>{id}</Link></li>
    );
    return (
        <>
        <b>Room List</b>
        <ul>
            {rooms}
        </ul>
        </>
    );
}

export interface IRoomListProps {
    roomIds: string[],
    tournamentId: string
}

export default RoomList;
