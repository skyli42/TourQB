import React from 'react';
import logo from './logo.svg';
// import './App.css';
import ModaqControl from './components/ModaqControl';


// This will be filled in by vite. This won't be used by people using the library
const __BUILD_VERSION__ = "one";

// If you want a different Google Sheets ID, replace this with your own
const demoGoogleClientId = "1038902414768-nj056sbrbe0oshavft2uq9et6tvbu2d5.apps.googleusercontent.com";
const demoYappService = "https://www.quizbowlreader.com/yapp/api/parse?modaq=true";
function App() {
  return (
    <ModaqControl
                buildVersion={__BUILD_VERSION__}
                googleClientId={demoGoogleClientId}
                yappServiceUrl={demoYappService}
            />
  );
}

export default App;
