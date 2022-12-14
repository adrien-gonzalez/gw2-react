import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Formik } from 'formik';
import { getAccount, getPermissions } from '../services/gw2API';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import permissions_data from '../data/permissions.json';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { Formik, Form, Field } from "formik";
import { TextField, InputAdornment } from "@material-ui/core";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import backgroundDark from '../img/background/backgroundDark.png';
import ClearIcon from '@mui/icons-material/Clear';
import Spinner from 'react-bootstrap/Spinner';

const ModalItem = (props) => {

  const [items, setItems] = useState(false);

  useEffect(() => {
    console.log(props)
    if(props.item){
        setItems(props)
    }
  },[props])

  function close(){
    props.close()
  }

  
  
    if(items){
        return (
            <Modal  
                show={props.show} 
                onHide={props.onHide}
                size="sl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                
                >

                <ClearIcon className="closeModal" onClick={close}></ClearIcon>

                <Modal.Body style={{backgroundImage: `url(${backgroundDark})`}} className="modal_item">
                    <div>
                        <img className="item_img" src={items.item.img}/>
                        <span className={items.item.rarity+'_text'}>ddd</span>
                    </div>
                
                </Modal.Body>

            </Modal>
            
        ); 
        } else {
            return(
                <Modal  
                    show={props.show} 
                    onHide={props.onHide}
                    size="sl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    
                    >

                    <ClearIcon className="closeModal" onClick={close}></ClearIcon>

                    <Modal.Body style={{backgroundImage: `url(${backgroundDark})`}} className="modal_item">
                        <Spinner
                        className="loader"
                        as="span"
                        animation="border"
                        size="lg"
                        role="status"
                        aria-hidden="true"
                    />
                    </Modal.Body>
                </Modal> 
            )
        }
};


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

export default connect(mapStateToProps, mapDispatchToProps)(ModalItem);


