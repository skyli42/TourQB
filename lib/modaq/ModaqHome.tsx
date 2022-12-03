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
      players={[{name: "A", teamName: "Toronto", isStarter: true}]}
    />
  );
}
export interface IModaqHomeProps{
  id: string;
  teams: any[]; // TODO: Figure out typing here
}
export default ModaqHome;
