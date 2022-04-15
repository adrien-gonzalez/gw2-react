import {Alert, Button} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import '../App.css';
import {connect} from 'react-redux';
import React, { useState  } from 'react';


import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const Header = (props) => {
    let navigate = useNavigate();
    return (
        <header className="App-header">
            <Button onClick={()=>navigate("pages/Test")} className="menuButton" variant="contained"><AccessTimeOutlinedIcon style={{ color: "white" }}></AccessTimeOutlinedIcon></Button>
            <Button onClick={()=>navigate("pages/Main")} className="menuButton" variant="contained"><PersonOutlineOutlinedIcon style={{ color: "white" }}></PersonOutlineOutlinedIcon></Button>
        </header>
    ); 
}



// RECUP DU STORE REDUX
const mapStateToProps = ({ apiKey }) => ({
    apiKey
});

// DISPATCH ACTIONS
const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

