import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from 'formik';
import { getAccount } from '../services/gw2API';
import React, { useState, useEffect } from 'react';


const ModalCharacter = (props) => {
  

  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') ?? '');

  useEffect(() => {
   
  },[])


  return (

    <>
      <Modal 
        show={props.show} 
        onHide={props.onHide}
        size="sl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Info personnage</Modal.Title>
        </Modal.Header>

          <Modal.Body>
            ddddd
        </Modal.Body>
      </Modal>
    </>
  );
};


export default ModalCharacter;

