import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { getItem, getSkin } from '../services/gw2API';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {  Tooltip, Zoom  } from '@mui/material';
import equipment_background from '../img/background/equipment.png';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

const ModalCharacter = (props) => {
  

  const [apiKey] = useState(localStorage.getItem('apiKey') ?? '');
  const [equipment, setEquipment] = useState(false);
  const [view, setView] = useState("equipment");

  const [bags, setBags] = useState("");
  const [item, setItem] = useState("");


  const item_table = []


  const tr = 12
  const td = 8



  const inventory = [
    {id : '0+0' , name : "Helm", number : 0},
    {id : '1+0' , name : "Shoulders", number : 0},
    {id : '2+0' , name : "Coat", number : 0},
    {id : '3+0' , name : "Gloves", number : 0},
    {id : '4+0' , name : "Leggings", number : 0},
    {id : '5+0' , name : "Boots", number : 0},
    {id : '7+0' , name : "Weapon", number : 1},
    {id : '8+0' , name : "Weapon", number : 2},
    {id : '8+5' , name : "HelmAquatic", number : 0},
    {id : '9+0' , name : "Weapon", number : 3},
    {id : '10+0' , name : "Weapon", number : 4},
    {id : '8+6' , name : "Weapon", number : 0},
    {id : '8+7' , name : "Weapon", number : 1},

    {id : '5+5' , name : "Back", number : 0},
    {id : '6+6' , name : "Ring", number : 0},
    {id : '6+7' , name : "Ring", number : 1},
    {id : '6+5' , name : "Amulet", number : 0},
    {id : '5+6' , name : "Accessory", number : 0},
    {id : '5+7' , name : "Accessory", number : 1},


    {id : '9+5' , name : "Foraging", number : 0},
    {id : '9+6' , name : "Mining", number : 0},
    {id : '9+7' , name : "Logging", number : 0}

  ]

 
 
  function close(){
      props.close()
  }

  const getMySkin = async (skin, api) => {
    const data = await getSkin(skin, api)
    return data
 
  };

  const getMyEquipment = async (item, api) => {
    const data = await getItem(item, api)
    return data
  };

  const character_detail = async (character_info) =>  {

    const object = await Promise.all(character_info.equipment.map((key, index) => {
      if(key.skin){
        return getMySkin(key.skin, apiKey)
      } else {
        return getMyEquipment(key.id, apiKey)
      }
    }))

    const object2 = await Promise.all(character_info.bags.map((key, index) => {
      if(key){
        return Promise.all(key.inventory.map((key2, index2) => {
            if(key2 != null){
              item_table.push(key2)
              return getMyEquipment(key2.id, apiKey)
            }
          }))
      } 
    }))

      setItem(item_table)
      setBags(object2)
      setEquipment(object)
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

          if(typeof item_find[[item_find_inventory.number]] !="undefined"){
              return(
                <Tooltip TransitionComponent={Zoom} title={item_find[[item_find_inventory.number]].name ?? 'Aucune description'} key={'tooltip_'+i+'+'+j} >
                  <td  key={'equipment_'+i+'+'+j} className={item_find[[item_find_inventory.number]].rarity} style={{backgroundImage: `url(${item_find[[item_find_inventory.number]].icon})`}}></td>
                </Tooltip>
              )
            } else {
            return(
              <td key={'equipment_'+i+'+'+j} className="border_equipment clean"></td>
            )
          }
          
           
        } else {

          const item_find = equipment_.filter(
            element => element.type == item_find_inventory.name
          )

          if(typeof item_find[item_find_inventory.number] !="undefined"){

            if(item_find[item_find_inventory.number].details.type != "Trident" && item_find[item_find_inventory.number].details.type != "Harpoon"  
            && item_find[item_find_inventory.number].details.type != "Speargun" && (i+'+'+j == '7+0' || i+'+'+j == '8+0' || i+'+'+j == '9+0' || i+'+'+j == '10+0')){
              return(
                <Tooltip TransitionComponent={Zoom} title={item_find[item_find_inventory.number].name ?? 'Aucune description'} key={'tooltip_'+i+'+'+j} >
                  <td key={'equipment_'+i+'+'+j}  className={item_find[[item_find_inventory.number]].rarity} style={{backgroundImage: `url(${item_find[item_find_inventory.number].icon})`}}></td>
                </Tooltip>
              )  
            } else if((i+'+'+j == '8+6' || i+'+'+j == '8+7') && (item_find[item_find_inventory.number].details.type == "Trident" || item_find[item_find_inventory.number].details.type == "Harpoon"  
            || item_find[item_find_inventory.number].details.type == "Speargun" )){
              return(
                <Tooltip TransitionComponent={Zoom} title={item_find[item_find_inventory.number].name ?? 'Aucune description'} key={'tooltip_'+i+'+'+j} >
                  <td  key={'equipment_'+i+'+'+j} className={item_find[[item_find_inventory.number]].rarity} style={{backgroundImage: `url(${item_find[item_find_inventory.number].icon})`}}></td>
                </Tooltip>
              )  
            } else {
              return(
                <td key={'equipment_'+i+'+'+j} className="border_equipment clean"></td>
              )  
            }
          } else {
            return(
              <td key={'equipment_'+i+'+'+j} className="border_equipment clean"></td>
            )  
          }


        }
      } else {
        return(
          <td key={'equipment_'+i+'+'+j}></td>
        )
      }

  }
  

  useEffect(() => {
    setEquipment(false)

    if(apiKey != null && props.character){
      character_detail(props.character)
    }

  },[props.character, apiKey])


  if(equipment != false){
    if(view == "equipment"){
      return ( 
        <>
          <Modal  
            show={props.show} 
            onHide={props.onHide}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header className="character_equipment_header">
              <Modal.Title id="contained-modal-title-vcenter">{props.character.name}</Modal.Title>
              <div className="changeView">
                <div><Inventory2OutlinedIcon onClick={() => setView("inventory")} style={{ color: "white" }}></Inventory2OutlinedIcon></div>
                <div><ShieldOutlinedIcon onClick={() => setView("equipment")} style={{ color: "white" }}></ShieldOutlinedIcon></div>
              </div>
            </Modal.Header>

            <Modal.Body style={{backgroundImage: `url(${equipment_background})`}}  className="modal_character">
            
            <table className="character_equipment">
                <tbody>
                {Array(tr).fill(1).map((el, i) =>  
                  <tr  key={i}>
                    {Array(td).fill(1).map((el, j) =>
                      find(i, j, equipment)
                    )}
                </tr>
                )}
                </tbody>
            </table> 
            </Modal.Body>
            <Button className="charater_equipement_button" onClick={close}>Annuler</Button>
          </Modal>
        </>
      );
    } else {
      if(bags != ""){
        // console.log(bags)
        return (
          <>
            <Modal 
              show={props.show} 
              onHide={props.onHide}
              size="sl"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header className="character_equipment_header">
                <Modal.Title id="contained-modal-title-vcenter">{props.character.name}</Modal.Title>
                <div className="changeView">
                  <div><Inventory2OutlinedIcon onClick={() => setView("inventory")} style={{ color: "white" }}></Inventory2OutlinedIcon></div>
                  <div><ShieldOutlinedIcon onClick={() => setView("equipment")} style={{ color: "white" }}></ShieldOutlinedIcon></div>
                </div>
              </Modal.Header>
      
              <Modal.Body style={{backgroundImage: `url(${equipment_background})`}}  className="modal_character">
                <table className='table_bags'>
                  <tbody>
                      {bags.map((key, index) => {
                        
                        if(key){
                          return(
                          <tr key={'bags_'+index} className="row_invetory">
                            {key.map((key2, index2) => {
                              if(key2){

                                const item_find = item.find(
                                    element => element.id == key2.id
                                )
                                if(item_find){
                                  return(
                                    <Tooltip TransitionComponent={Zoom} title={key2.description ?? 'Aucune description'} key={index2+'tool_'+key2} >
                                        <td className={key2.rarity} style={{backgroundImage: `url(${key2.icon})`}} key={index2+'tab_'+key2}> 
                                            <span key={'img_'+index2} className='count_item'>{item_find.count}</span>
                                        </td>  
                                    </Tooltip>
                                  )
                                }
                              }
                            })}
                          </tr>
                          )
                        }
                      })}
                  </tbody>
                </table>
              </Modal.Body>
              <Button className="charater_equipement_button" onClick={close}>Annuler</Button>
    
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
                <Modal.Header className="character_equipment_header">
                  <Modal.Title id="contained-modal-title-vcenter">{props.character.name}</Modal.Title>
                </Modal.Header>
        
                <Modal.Body className="loading_character_equipment">
                  <Spinner
                    className="loader"
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                  />
                </Modal.Body>
                <Button className="charater_equipement_button" onClick={close}>Annuler</Button>
      
              </Modal>
            </>
          );
        }
    }
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
          <Modal.Header className="character_equipment_header">
            <Modal.Title id="contained-modal-title-vcenter">Info personnage</Modal.Title>
          </Modal.Header>
  
          <Modal.Body className="loading_character_equipment">
            <Spinner
              className="loader"
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
          </Modal.Body>
          <Button className="charater_equipement_button" onClick={close}>Annuler</Button>

        </Modal>
      </>
    );
  }

};


export default ModalCharacter;
