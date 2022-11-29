import {Button} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import '../App.css';
import {connect} from 'react-redux';
import React, { useState,useEffect } from 'react';
import KeyIcon from '@mui/icons-material/Key';
// import ModalAuth from "./ModalAuth";
import { useNavigate } from "react-router-dom";
import bank from "../img/icon/bank.svg";
import boss from "../img/icon/boss.svg";
import trading from "../img/icon/trading.png";








const Header = (props) => {

  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') ?? '');
  const [color, setColor] = useState(localStorage.getItem('color') ?? 'default');

  useEffect(() => {
    if(props.apiKey.key != 0){
        setApiKey(props.apiKey.key)
    }

    if(props.appColor.color != 0){
      setColor(props.appColor.color)
    }
  },[props])

    let navigate = useNavigate();
    return (
        <header style={{backgroundColor: color == 'default' ? 'transparent' : '#222222'}} className="App-header">
        
            {/* <Button onClick={() => setShowModalAuth(true)}  style={{ backgroundColor: localStorage.getItem('apiKey') ? '#4ECDC4' : '#C62E2D' }} className={color == '#C62E2D' ? 'zoom menuButton' : 'menuButton'} variant="contained"><KeyIcon className="menuIcon" style={{ color: "white" }}></KeyIcon></Button>
            <ModalAuth show={showModalAuth} close={() => setShowModalAuth(false)} /> */}
            <Button onClick={()=>navigate("pages/events")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><AccessTimeFilledIcon className="menuIcon" style={{ color: "white" }}></AccessTimeFilledIcon></Button> 
            <Button onClick={()=>navigate("pages/worldboss")} style={{ backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundImage: `url(${boss})`}}></div></Button>
            
            {apiKey ? <Button onClick={()=>navigate("pages/characters")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><PersonIcon className="menuIcon" style={{ color: "white" }}></PersonIcon></Button> : ''}
            {apiKey ? <Button onClick={()=>navigate("pages/bank")} style={{  backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundImage: `url(${bank})`}}></div></Button>  : ''}
            <Button onClick={()=>navigate("pages/trading")} style={{ backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundImage: `url(${trading})`}}></div></Button>

        </header>
        
    ); 


   
}



// RECUP DU STORE REDUX
const mapStateToProps = ({ apiKey, appColor }) => ({
    apiKey,
    appColor
});

// DISPATCH ACTIONS
const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

