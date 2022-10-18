import './App.css';
import Header from './components/header';
// Background image
import background from './img/background/background.png';
import {Provider } from 'react-redux';
import Store from './store/configureStore';

import React, { useState, useEffect } from 'react';

import Events from './pages/Events';
import Worldboss from './pages/Worldboss';
import Characters from './pages/Characters';
import Bank from './pages/Bank';
import SettingsIcon from '@mui/icons-material/Settings';

import ModalAuth from "./components/ModalAuth";

// Router for navigation
import {
  BrowserRouter,
  HashRouter,
  Routes, //replaces "Switch" used till v5
  Route,
  Navigate
} from "react-router-dom";

const App = (props) => {
 
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);
  

  return (
    <Provider store={Store}>



      <HashRouter>
        <div className="App" style={{backgroundColor: localStorage.getItem('color') == "dark" ? '#222222' : '', backgroundImage: localStorage.getItem('color') == "dark" ? '' : 'url('+background+')'}} >

          <Header/>
          <SettingsIcon style={{color: localStorage.getItem('color') == "dark" ? 'white' : 'black'}} onClick={() => setShowModalAuth(true)} className="settings"></SettingsIcon>
          <ModalAuth show={showModalAuth} close={() => setShowModalAuth(false)} />

          <Routes>
            {/* NAVIGATE BY URL */}
            <Route path="/gw2-react" element={<Navigate to="/pages/worldboss" />} />
            <Route path="/" element={<Navigate to="/pages/worldboss" />} />

          


          

            {/* HEADER NAVIGATE */}
            <Route exact path="pages/events" element={<Events/>}/>
            <Route exact path="pages/worldboss" element={<Worldboss/>}/>
            <Route exact path="pages/characters" element={<Characters/>}/>
            <Route exact path="pages/bank" element={<Bank/>}/>

          </Routes>
        </div>
      </HashRouter>
    </Provider>
    
  );
}



export default App;