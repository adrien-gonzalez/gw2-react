import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { getItem, getSkin } from '../services/gw2API';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';


const ModalCharacter = (props) => {
  

  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') ?? '');
  const [load, setLoad] = useState(false);
  const [equipment, setEquipment] = useState("");
  const [test, setTest] = useState(0);


  const equipment_table = []

  function close(){
      props.close()
  }


  const character_detail = async (character_info) => {
    await character_info.equipment.map((key, index) => {
      if(key.skin){
        getSkin(key.skin, apiKey).then(item=>
        {
          equipment_table.push(item)
        })
      } else {
        getItem(key.id, apiKey).then(item=>
        {
          equipment_table.push(item)
        })

        if(index + 1 === character_info.equipment.length){
          setEquipment("d")

          setTimeout(function(){
            console.log(equipment)

          },1000)
        }
      }
    })



  };


  useEffect(() => {
    // setEquipment("")
    setLoad(false)
    if(apiKey != null && props.character){
      
      character_detail(props.character)

      console.log(equipment)
    }
  },[props.character])


  if(load == true){
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
          {equipment_table.map((key, index) => {
              return(
                <div key={key.name}>{key.name}</div>
              )
          })}
           
          </Modal.Body>
          <Button className="modalButton" onClick={close}>Annuler</Button>
        </Modal>
      </>
    );
  } else {
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
      </>
    );
  }

};


export default ModalCharacter;

