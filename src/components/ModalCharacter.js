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
  const tr = 12
  const td = 10



  const inventory = [
    {id : '0+0' , name : "Helm"},
    {id : '1+0' , name : "Shoulders"},
    {id : '2+0' , name : "Coat"},
    {id : '3+0' , name : "Gloves"},
    {id : '4+0' , name : "Leggings"},
    {id : '5+0' , name : "Boots"},
    {id : '7+0' , name : "Weapon"},
    {id : '8+0' , name : "Weapon"},
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
   console.log(object)

  };

  function find(i, j, equipment_){

      const item_find_inventory = inventory.find(
        element => element.id == i+'+'+j
      )


      if(typeof item_find_inventory != "undefined"){

        if(item_find_inventory.name != "Weapon"){
          const item_find = equipment_.filter(
            element => element.details ? element.details.type == item_find_inventory.name : element.type == item_find_inventory.name
          )

          if(typeof item_find[0] !="undefined"){
            return(
              <TableCell style={{backgroundImage: `url(${item_find[0].icon})`}}></TableCell>
            )
          } else {
            return(
              <TableCell></TableCell>
            )
          }
        } else {

          const item_find = equipment_.filter(
            element => element.type == item_find_inventory.name
          )
          return(
            <TableCell></TableCell>
          )

          // return(
          //   item_find.slice(0,3).map((key, index) =>{
          //     if(key.details.type != "Trident" && key.details.type != "Harpoon" ){
          //       return(
          //             <TableCell style={{backgroundImage: `url(${key.icon})`}}></TableCell>
          //           )
                    
          //     }

          //   })
          // )
        }
      } else {
        return(
          <TableCell></TableCell>
        )
      }

  }
  

  useEffect(() => {
    // console.log(inventory)
    setEquipment(false)

   
  
   

   
    if(apiKey != null && props.character){
      character_detail(props.character)
    }

  },[props.character, apiKey])


  if(equipment != false){
  //   const item_find = equipment.find(
  //     element => element.details ? element.details.type == "Boots" : element.type == "Boots"
  //   )


  //   console.log(item_find)

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
           
          <Table className="character_equipment">
              <TableBody>
              {Array(tr).fill(1).map((el, i) => 
                 
                <TableRow>
                  {Array(td).fill(1).map((el, j) =>
                      
                      find(i, j, equipment)
                      
                      // <TableCell></TableCell>
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

