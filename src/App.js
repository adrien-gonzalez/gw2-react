import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {Button} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


import {getAccount} from './services/gw2API.js';





const App = () => {


const [account, setAccount] = useState([]);

const fetchAccount = async () => {
  try {
    const data = await getAccount();
    // setAccount(data.id)
  
   
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchAccount();
})

  return (
    <div className="App">
      <header className="App-header">
        <Button className="menuButton" variant="contained"><AccessTimeOutlinedIcon style={{ color: "black" }}></AccessTimeOutlinedIcon></Button>
        <Button className="menuButton" variant="contained"><PersonOutlineOutlinedIcon style={{ color: "black" }}></PersonOutlineOutlinedIcon></Button>
        {/* {alert(account)} */}
      </header>
    </div>
  );
}

export default App;
