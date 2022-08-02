import { Stack, StackItem } from '@fluentui/react';
import React from 'react';
import RoomGenerator from './RoomGenerator';
import RoomList from './RoomList';

function TDDashboard(props: ITDDashboardProps) {
    return (
        <div className="td-control">
            <Stack>
                <StackItem>
                    <RoomList roomIds={props.roomIds} />
                </StackItem>
                <StackItem>
                    <RoomGenerator roomIds={props.roomIds} setRoomIds={props.setRoomIds} />
                </StackItem>
            </Stack>

        </div>
    );
}

export interface ITDDashboardProps {
    roomIds: string[],
    setRoomIds: React.Dispatch<React.SetStateAction<string[]>>
}

export default TDDashboard;
