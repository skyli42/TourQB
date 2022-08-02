import React from 'react';
import Warning from './Warning';

function hasDuplicates(arr: any[]) {
    return new Set(arr).size !== arr.length;
}
function RoomGenerator(props: IRoomGeneratorProps) {
    const [textInput, setTextInput] = React.useState(props.roomIds.join("\n"));
    const [warningText, setWarningText] = React.useState("");
    const regenerateRooms = () => {
        const newRooms = textInput.split("\n");
        setWarningText("");
        if(hasDuplicates(newRooms)){
            setWarningText("Duplicate Room Name!");
        }
        else props.setRoomIds(textInput.split("\n"));
    };
    return (
        <>
            <b>Generate New Rooms</b>
            <Warning text={warningText}/>
            <textarea id="room-names" value={textInput} onChange={(e)=>setTextInput(e.target.value)}>
            </textarea>
            <button onClick={regenerateRooms}>Generate Rooms</button>
        </>
    );
}

export interface IRoomGeneratorProps {
    roomIds: string[],
    setRoomIds: React.Dispatch<React.SetStateAction<string[]>>
}
export default RoomGenerator;
