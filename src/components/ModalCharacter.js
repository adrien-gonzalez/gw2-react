import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { getItem, getSkin } from '../services/gw2API';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Login } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableRow, Tooltip, Zoom  } from '@mui/material';
import $ from 'jquery';


const ModalCharacter = (props) => {
  

  const [apiKey] = useState(localStorage.getItem('apiKey') ?? '');
  const [equipment, setEquipment] = useState(false);
  const tr = 9
  const td = 6

  const inventory = [
    {id : "tr1_td1" , name : "Helm"},
    {id : "tr2_td2" , name : "Shoulders"},
    {id : "tr3_td3" , name : "Coat"},
    {id : "tr4_td4" , name : "Gloves"},
    {id : "tr5_td5" , name : "Leggings"},
    {id : "tr6_td6" , name : "Boots"},

    {id : "tr6_td6" , name : "Boots"},
    {id : "tr6_td6" , name : "Boots"},
    {id : "tr6_td6" , name : "Boots"},


  ]

 
 
  function close(){
      props.close()
  }

  const skin = async (skin, api) => {
    const data = await getSkin(skin, api)
    return data
 
  };

  const item = async (item, api) => {
    const data = await getItem(item, api)
    return data
  };

  const character_detail = async (character_info) =>  {

    const object = await Promise.all(character_info.equipment.map((key, index) => {
      if(key.skin){
        return skin(key.skin, apiKey)
      } else {
        return item(key.id, apiKey)
      }
    }))

   setEquipment(object)

  };

  function find(i, equipment_){
   
    const item_find = equipment_.find(
      element => element.details ? element.details.type : element.detail == inventory[i].name
    )
    console.log(item_find)

    // if(item_find){
    //   return(
    //     <TableCell>{item_find.name}</TableCell>
    //   )
    // }
  }
  

  useEffect(() => {
    // console.log(inventory)
    setEquipment(false)

  

   
    if(apiKey != null && props.character){
      character_detail(props.character)

     

      // console.log(equipment[0].details.type)
      // console.log(equipment[0].type)
      // console.log(equipment)

    }

  },[props.character, apiKey])


  if(equipment != false){
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
           
          <Table>
              <TableBody>
                
              {Array(tr).fill(1).map((el, i) =>
                <TableRow>
                  {Array(td).fill(1).map((el, j) =>
                     
                      find(i, equipment)
                      
                      // <TableCell id="ee">{i}</TableCell>
                  )}
              </TableRow>
              )}
           
               
               
              </TableBody>
          </Table>
                    {/* {equipment.map((key, index) => {
                        return(
                          <div className="item_image" style={{backgroundImage: `url(${key.icon})`}} key={key.name+index}>{key.name}</div>
                        )
                    })}  */}
              
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
          <Button className="modalButton" onClick={close}>Annuler</Button>

        </Modal>
      </>
    );
  }

};


export default ModalCharacter;

