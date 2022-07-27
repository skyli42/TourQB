import { Stack, StackItem } from '@fluentui/react';
import React from 'react';


function RoomList(props: IRoomListProps) {

    const rooms = props.room_ids.map((id)=>
        <li key={id}>{id}</li>
    );
    return (
        <ul>
            {rooms}
        </ul>
    );
}

export interface IRoomListProps {
    room_ids: string[]
}

export default RoomList;
