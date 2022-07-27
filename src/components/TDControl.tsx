import { Stack, StackItem } from '@fluentui/react';
import React from 'react';
import RoomGenerator from './RoomGenerator';
import RoomList from './RoomList';

function TDControl(props: ITDControlProps) {
    const room_ids: string[] = [];

    room_ids.push("help");
    return (
        <div className="td-control">
            <Stack>
                <StackItem>
                {props.tour_id}
                </StackItem>
                <StackItem>
                    <RoomList room_ids = {room_ids}/>
                </StackItem>
                <StackItem>
                    <RoomGenerator />
                </StackItem>
            </Stack>
            
        </div>
    );
}

export interface ITDControlProps {
    tour_id: string
}

export default TDControl;
