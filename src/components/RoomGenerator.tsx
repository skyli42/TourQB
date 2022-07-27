import { Stack, StackItem } from '@fluentui/react';
import React from 'react';


function RoomGenerator() {
    // let room_ids: string[] = [];
    const regenerateRooms = React.useCallback(() => {
        console.log("regenerating")
    }, []);
    return (
        <>
            <textarea id="room-names">
                
            </textarea>
            <button onClick={regenerateRooms}>Generate Rooms</button>
        </>
    );
}


export default RoomGenerator;
