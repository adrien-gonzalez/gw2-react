import './App.css';
import Header from './components/header';
// Background image
import background from './img/background/background.png';
import {Provider } from 'react-redux';
import Store from './store/configureStore';

import React, { useState } from 'react';

import Events from './pages/Events';
import Worldboss from './pages/Worldboss';
import Characters from './pages/Characters';
import Bank from './pages/Bank';
import SettingsIcon from '@mui/icons-material/Settings';

import ModalAuth from "./components/ModalAuth";


// Router for navigation
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
  Navigate
} from "react-router-dom";

const App = (props) => {
 
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);




  return (
    <Provider store={Store}>

      <BrowserRouter>
        <div className="App" style={{backgroundImage: 'url('+background+')'}} >
          <Header/>
          <SettingsIcon onClick={() => setShowModalAuth(true)} className="settings"></SettingsIcon>
          <ModalAuth show={showModalAuth} close={() => setShowModalAuth(false)} />

          <Routes>
            <Route path="/gw2-react" element={<Navigate to="/pages/Worldboss" />} />
            <Route path="/" element={<Navigate to="/pages/Worldboss" />} />
            <Route exact path="pages/events" element={<Events/>}/>
            <Route exact path="pages/worldboss" element={<Worldboss/>}/>
            <Route exact path="pages/characters" element={<Characters/>}/>
            <Route exact path="pages/bank" element={<Bank/>}/>

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
    
  );
}



export default App;