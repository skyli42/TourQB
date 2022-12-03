import React from 'react';
import ModaqControl from './components/ModaqControl';


// If you want a different Google Sheets ID, replace this with your own
const demoGoogleClientId = "1038902414768-nj056sbrbe0oshavft2uq9et6tvbu2d5.apps.googleusercontent.com";
const demoYappService = "https://www.quizbowlreader.com/yapp/api/parse?modaq=true";
function ModaqHome(props: IModaqHomeProps) {
  return (
    <ModaqControl
      googleClientId={demoGoogleClientId}
      yappServiceUrl={demoYappService}
      storeName={props.id}
<<<<<<< HEAD
      players={[{name: "A", teamName: "Toronto", isStarter: true}]}
=======
>>>>>>> bf3a9ab383844b4af2705ebdc30a4c42e583935c
    />
  );
}
export interface IModaqHomeProps{
<<<<<<< HEAD
  id: string;
  teams: any[]; // TODO: Figure out typing here
=======
  id: string
>>>>>>> bf3a9ab383844b4af2705ebdc30a4c42e583935c
}
export default ModaqHome;
