import React from 'react';
import Warning from './Warning';
<<<<<<< HEAD

=======
import fs from "fs";
import path from "path";
>>>>>>> bf3a9ab383844b4af2705ebdc30a4c42e583935c
function hasDuplicates(arr: any[]) {
    return new Set(arr).size !== arr.length;
}


async function updateRooms(tournamentId: string, newRooms: string[]) {
    const roomsJSON = await fetch(`/api/tournament/${tournamentId}/rooms`, {
        method: "POST",
        body: JSON.stringify({ newRooms: newRooms})
    }).then((res) => res.json());
    return roomsJSON.rooms;

}

function RoomGenerator(props: IRoomGeneratorProps) {
    const [textInput, setTextInput] = React.useState(props.roomIds.join("\n"));
    const [warningText, setWarningText] = React.useState("");
    const regenerateRooms = () => {
        const newRooms = textInput.split("\n").filter((element) => element !== "") ;
        setWarningText("");

        //TODO: update database
        if (hasDuplicates(newRooms)) {
<<<<<<< HEAD
            //TODO: disallow naming a room certain keywords ("dashboard")
=======
>>>>>>> bf3a9ab383844b4af2705ebdc30a4c42e583935c
            setWarningText("Duplicate Room Name!");
        }
        else {
            const callRooms = async () => {
                await updateRooms(props.tournamentId, newRooms);
            };
            props.setRoomIds(newRooms);
            callRooms();
        }
    };
    return (
        <>
            <b>Generate New Rooms</b>
            <Warning text={warningText} />
            <textarea id="room-names" value={textInput} onChange={(e) => setTextInput(e.target.value)}>
            </textarea>
            <button onClick={regenerateRooms}>Generate Rooms</button>
        </>
    );
}

export interface IRoomGeneratorProps {
    roomIds: string[],
    setRoomIds: React.Dispatch<React.SetStateAction<string[]>>,
    tournamentId: string
}
export default RoomGenerator;
