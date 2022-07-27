import React from 'react';
import ModaqHome from './modaq/ModaqHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteHome from './components/SiteHome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteHome />} />
        <Route path='/modaq' element={<ModaqHome id="1" />} />
        <Route path='/modaq2' element={<ModaqHome id="2" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
