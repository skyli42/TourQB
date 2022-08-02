import { Stack, StackItem } from '@fluentui/react';
import React from 'react';
import { Link } from 'react-router-dom';


function RoomList(props: IRoomListProps) {

    const rooms = props.roomIds.map((id)=>
        <li key={id}><Link to={"/tournament/room/"+id}>{id}</Link></li>
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
    roomIds: string[]
}

export default RoomList;
