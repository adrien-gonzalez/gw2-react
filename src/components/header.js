import {Button} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PetsIcon from '@mui/icons-material/Pets';

import '../App.css';
import {connect} from 'react-redux';
import React, { useState } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import ModalAuth from "./ModalAuth";
import { useNavigate } from "react-router-dom";
import bank from "../img/icon/bank.svg";
import boss from "../img/icon/boss.svg";
import hero from "../img/icon/hero.svg";






const Header = (props) => {


    const [showModalAuth, setShowModalAuth] = useState(false);
    const [color] = useState(localStorage.getItem('apiKey') ? '#4ECDC4' : '#C62E2D');

    let navigate = useNavigate();
    return (
        <header className="App-header">
        
            <Button onClick={() => setShowModalAuth(true)}  style={{ backgroundColor: localStorage.getItem('apiKey') ? '#4ECDC4' : '#C62E2D' }} className={color == '#C62E2D' ? 'zoom menuButton' : 'menuButton'} variant="contained"><KeyIcon className="menuIcon" style={{ color: "white" }}></KeyIcon></Button>
            <ModalAuth show={showModalAuth} close={() => setShowModalAuth(false)} />
            <Button onClick={()=>navigate("pages/events")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><AccessTimeOutlinedIcon className="menuIcon" style={{ color: "white" }}></AccessTimeOutlinedIcon></Button> 
            <Button onClick={()=>navigate("pages/worldboss")} style={{ backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundImage: `url(${boss})`}}></div></Button>
            <Button onClick={()=>navigate("pages/characters")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><PersonOutlineOutlinedIcon className="menuIcon" style={{ color: "white" }}></PersonOutlineOutlinedIcon></Button>
            <Button style={{  backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundImage: `url(${bank})`}}></div></Button> 
        </header>
        
    ); 


   
}



// RECUP DU STORE REDUX
const mapStateToProps = ({ apiKey }) => ({
    apiKey,
});

// DISPATCH ACTIONS
const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

