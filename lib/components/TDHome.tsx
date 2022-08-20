import React, { useEffect } from 'react';
import { Stack, StackItem } from '@fluentui/react';
import RoomList from './RoomList';
import RoomGenerator from './RoomGenerator'


async function getRooms(tournamentId: string): Promise<string[]> {
  //TODO: replace with database and/or api call
  const roomsJSON = await fetch(`/api/tournament/${tournamentId}/rooms`, { method: "GET" }).then((res) => res.json());
  return roomsJSON.rooms;
}


function TDHome(props: ITDHomeProps) {
  const [roomIds, setRoomIds] = React.useState<string[]>(props.rooms);
  return (
    <>
      <h1>{props.tournamentName} @ {props.tournamentLocation}</h1>
      <Stack>
        <StackItem>
          <RoomList tournamentId={props.tournamentId} roomIds={roomIds} />
        </StackItem>
        <StackItem>
          <RoomGenerator roomIds={roomIds} setRoomIds={setRoomIds} tournamentId={props.tournamentId} />
        </StackItem>
      </Stack>
    </>
  );
}

export interface ITDHomeProps {
  tournamentName: string,
  tournamentLocation: string,
  tournamentId: string,
  rooms: string[]
}

export default TDHome;
