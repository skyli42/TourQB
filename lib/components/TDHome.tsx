import React from 'react';
import TDDashboard from './TDDashboard';


function TDHome(props: ITDHomeProps) {
  const [roomIds, setRoomIds] = React.useState<string[]>([]);

  return (
    <>
      <h1>{props.tournamentName} @ {props.tournamentLocation}</h1>
      <TDDashboard roomIds={roomIds} setRoomIds={setRoomIds} />
    </>
  );
}

export interface ITDHomeProps{
  tournamentName: string,
  tournamentLocation: string
}

export default TDHome;
