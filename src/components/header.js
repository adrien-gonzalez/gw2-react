import {Button} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import '../App.css';
import {connect} from 'react-redux';
import React, { useState,useEffect } from 'react';
import KeyIcon from '@mui/icons-material/Key';
// import ModalAuth from "./ModalAuth";
import { useNavigate } from "react-router-dom";
import bank from "../img/icon/bank.svg";
import boss from "../img/icon/boss.svg";
import trading from "../img/icon/trading.png";
import map from "../img/icon/map.png";
// import todo from "../img/icon/todo.png";










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
      <div className="div-header">
        <header style={{backgroundColor: color == 'default' ? 'transparent' : '#222222'}} className="App-header">
            <Button onClick={()=>navigate("pages/todo")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><AssignmentTurnedInIcon className="menuIcon" style={{ color: "white" }}></AssignmentTurnedInIcon></Button> 
        
            {/* <Button onClick={() => setShowModalAuth(true)}  style={{ backgroundColor: localStorage.getItem('apiKey') ? '#4ECDC4' : '#C62E2D' }} className={color == '#C62E2D' ? 'zoom menuButton' : 'menuButton'} variant="contained"><KeyIcon className="menuIcon" style={{ color: "white" }}></KeyIcon></Button>
            <ModalAuth show={showModalAuth} close={() => setShowModalAuth(false)} /> */}
            <Button onClick={()=>navigate("pages/events")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><AccessTimeFilledIcon className="menuIcon" style={{ color: "white" }}></AccessTimeFilledIcon></Button> 
            <Button onClick={()=>navigate("pages/worldboss")} style={{ backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundImage: `url(${boss})`}}></div></Button>
            
            {apiKey ? <Button onClick={()=>navigate("pages/characters")} style={{ backgroundColor: "black" }} className="menuButton" variant="contained"><PersonIcon className="menuIcon" style={{ color: "white" }}></PersonIcon></Button> : ''}
            {apiKey ? <Button onClick={()=>navigate("pages/bank")} style={{  backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundImage: `url(${bank})`}}></div></Button>  : ''}
            <Button onClick={()=>navigate("pages/trading")} style={{ backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundImage: `url(${trading})`}}></div></Button>
            <Button onClick={()=>navigate("pages/map")} style={{ backgroundColor: "black" }} className="ButtonPng menuButton" variant="contained"><div className="buttonWithIcon" style={{ backgroundSize: 'contain', backgroundImage: `url(${map})`}}></div></Button>

        </header>

          <div className="burgerMenu">
          <input id="toggle" type="checkbox"></input>

          <label htmlFor="toggle" className="hamburger">
            <div style={{backgroundColor: localStorage.getItem('color') == "dark" ? 'white' : 'black'}} className="top-bun"></div>
            <div style={{backgroundColor: localStorage.getItem('color') == "dark" ? 'white' : 'black'}} className="meat"></div>
            <div style={{backgroundColor: localStorage.getItem('color') == "dark" ? 'white' : 'black'}} className="bottom-bun"></div>
          </label>

          <div style={{backgroundColor: localStorage.getItem('color') == "dark" ? 'rgb(34, 34, 34)' : 'white'}} className="nav">
            <div className="nav-wrapper">
              <nav>
                <label htmlFor="toggle"  onClick={()=>navigate("pages/todo")}><div className="buttonWithIconMobile"><AssignmentTurnedInIcon className="menuIcon" style={{ color: "white" }}/></div><span>To Do List</span></label>
                <label htmlFor="toggle"  onClick={()=>navigate("pages/events")}><div className="buttonWithIconMobile"><AccessTimeFilledIcon className="menuIcon" style={{ color: "white" }}/></div><span>Évènements</span></label>
                <label htmlFor="toggle"  onClick={()=>navigate("pages/worldboss")}><div className="buttonWithIconMobile"><div style={{ backgroundImage: `url(${boss})`}}></div></div><span>WorldBoss</span></label>
                {apiKey ?<label htmlFor="toggle"  onClick={()=>navigate("pages/characters")}><div className="buttonWithIconMobile"><PersonIcon className="menuIcon" style={{ color: "white" }}/></div><span>Personnages</span></label>: ''}
                {apiKey ?<label htmlFor="toggle"  onClick={()=>navigate("pages/bank")}><div className="buttonWithIconMobile"><div style={{ backgroundImage: `url(${bank})`}}></div></div><span>Banque</span></label> : ''}
                <label htmlFor="toggle"  onClick={()=>navigate("pages/trading")}><div className="buttonWithIconMobile"><div style={{ backgroundImage: `url(${trading})`}}></div></div><span>Commerce</span></label>
                <label htmlFor="toggle"  onClick={()=>navigate("pages/map")}><div className="buttonWithIconMobile"><div style={{ backgroundSize: 'contain', backgroundImage: `url(${map})`}}></div></div><span>Map</span></label>
                {/* <label htmlFor="toggle"  onClick={()=>navigate("pages/todo")}><div className="buttonWithIconMobile"><div style={{ backgroundSize: 'contain', backgroundImage: `url(${todo})`}}></div></div><span>Tâches</span></label> */}
              </nav>
            </div>
          </div>
          </div>
      </div>

        
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

