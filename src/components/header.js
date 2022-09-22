import {Button} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import '../App.css';
import {connect} from 'react-redux';
import React, { useState  } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import ModalAuth from "./ModalAuth";
import { useNavigate } from "react-router-dom";



const Header = (props) => {
 
    const [showModalAuth, setShowModalAuth] = useState(false);

    let navigate = useNavigate();
    return (
        <header className="App-header">
            <Button onClick={() => setShowModalAuth(true)} className="menuButton" variant="contained"><KeyIcon style={{ color: "white" }}></KeyIcon></Button>
            <ModalAuth show={showModalAuth} close={() => setShowModalAuth(false)} />
            <Button onClick={()=>navigate("pages/Worldboss")} className="menuButton" variant="contained"><AccessTimeOutlinedIcon style={{ color: "white" }}></AccessTimeOutlinedIcon></Button>
            <Button onClick={()=>navigate("pages/Test")} className="menuButton" variant="contained"><PersonOutlineOutlinedIcon style={{ color: "white" }}></PersonOutlineOutlinedIcon></Button>
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

