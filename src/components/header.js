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



const Header = (props) => {


    const [showModalAuth, setShowModalAuth] = useState(false);
    const [color] = useState(localStorage.getItem('apiKey') ? '#4ECDC4' : '#C62E2D');

    let navigate = useNavigate();
    return (
        <header className="App-header">
        
            <Button onClick={() => setShowModalAuth(true)}  style={{ backgroundColor: localStorage.getItem('apiKey') ? '#4ECDC4' : '#C62E2D' }} className={color == '#C62E2D' ? 'zoom menuButton' : 'menuButton'} variant="contained"><KeyIcon className="menuIcon" style={{ color: "white" }}></KeyIcon></Button>
            <ModalAuth show={showModalAuth} close={() => setShowModalAuth(false)} />
            <Button onClick={()=>navigate("pages/events")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><AccessTimeOutlinedIcon className="menuIcon" style={{ color: "white" }}></AccessTimeOutlinedIcon></Button> 
            <Button onClick={()=>navigate("pages/worldboss")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><PetsIcon className="menuIcon" style={{ color: "white" }}></PetsIcon></Button>
            <Button onClick={()=>navigate("pages/characters")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><PersonOutlineOutlinedIcon className="menuIcon" style={{ color: "white" }}></PersonOutlineOutlinedIcon></Button>
           
            {/* <Button onClick={()=>navigate("pages/inventory")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><Inventory2OutlinedIcon style={{ color: "white" }}></Inventory2OutlinedIcon></Button> */}
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

