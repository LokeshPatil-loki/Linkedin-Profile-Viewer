
import './App.css'
import './index.css';

import React from 'react';

import SearchBox from './components/SearchBox';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './ProfilePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div className="bg-gray-100">
          <SearchBox />
        </div>} />

        <Route path='/profile' element={<ProfilePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
