import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { getItem, getSkin, getWallet, getCurrencies } from '../services/gw2API';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {  Tooltip, Zoom  } from '@mui/material';
import equipment_background from '../img/background/bg_panel.jpg';

import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import inventory_icon  from "../img/icon/inventory_icon.png";
import equipment_icon from "../img/icon/equipment_icon.png";
import coin_icon from "../img/icon/coin.png";


import gold_icon from "../img/icon/gold.png";
import silver_icon from "../img/icon/silver.png";
import bronze_icon from "../img/icon/bronze.png";

// Image of character
import Elementalist from '../img/icon/elementalist_icon.png';
import Guardian from '../img/icon/guardian_icon.png';
import Mesmer from '../img/icon/mesmer_icon.png';
import Necromancer from '../img/icon/necromancer_icon.png';
import Ranger from '../img/icon/ranger_icon.png';
import Revenant from '../img/icon/revenant_icon.png';
import Thief from '../img/icon/thief_icon.png';
import Warrior from '../img/icon/warrior_icon.png';
import Engineer from '../img/icon/engineer_icon.png';

const ModalCharacter = (props) => {
  

  const [apiKey] = useState(localStorage.getItem('apiKey') ?? '');
  const [equipment, setEquipment] = useState(false);
  const [money, setMoney] = useState(false)
  const [view, setView] = useState("home");
  const [bags, setBags] = useState(false);

  const tr = 11
  const td = 8

  const images_class = [
    { id: 'Elementalist', src: Elementalist},
    { id: 'Guardian', src: Guardian},
    { id: 'Mesmer', src: Mesmer},
    { id: 'Necromancer', src: Necromancer},
    { id: 'Ranger', src: Ranger},
    { id: 'Revenant', src: Revenant},
    { id: 'Thief', src: Thief},
    { id: 'Warrior', src: Warrior},
    { id: 'Engineer', src: Engineer},

];

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

  const getMyEquipment = async (item, api, count) => {
    const data = await getItem(item, api)
    data.count = count
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
              return getMyEquipment(key2.id, apiKey, key2.count)
            }
          }))
      } 
    }))

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

  const currencies = async (item, api, count) => {
      const data = await getCurrencies(api, item)
      data[0].count = count
      return data[0]
  };

  const getMoney = async () => {
    try {
        const data = await getWallet(apiKey);
        const object = await Promise.all(data.map((key, index) => {
            return currencies(key.id, apiKey, key.value)
        }))

        // 1 or = 100 argent / 10 000 bronze
        // 1 argent = 100 bronze 
        setMoney(object)
 
    } catch (error) {
        console.log(error)
    }
};

  function currency_calculation(count) {
    var gold = 0
    var silver = 0
    var bronze = 0
    var remaining = 0
    var currency = 0

    if(count >= 10000){
      currency = count / 10000
      gold = parseInt(currency)
      remaining = currency - gold

      if(remaining > 0){
        currency = remaining * 100
        silver = parseInt(currency)
        remaining =  currency - silver

        if(remaining > 0){
          bronze = parseInt(remaining * 100)
        }
      }

    } else if(count >= 100){
      currency = count / 100
      silver = parseInt(currency)
      remaining = currency - silver

      if(remaining > 0){
        bronze = parseInt(remaining * 100)
      }

    } else {
      bronze = count
    }

    return (
      <span className="count_gold">
        {gold}
        <div style={{backgroundImage: `url(${gold_icon})`}}></div>
        {silver}
        <div style={{backgroundImage: `url(${silver_icon})`}}></div>
        {bronze}
        <div style={{backgroundImage: `url(${bronze_icon})`}}></div>
      </span>
    )
  }
  
    function getAttributes(infosItems){
        
      if(infosItems.details){
          if(infosItems.details.infix_upgrade){
              return(
                  <div>
                      {infosItems.details.infix_upgrade.attributes.map((key, index) => {
                          return(
                              <div key={infosItems.id+'_'+key.attribute}>{key.attribute} : <span>+{key.modifier}</span></div>
                          )
                      })}
                      <div className="description_item">{infosItems.description ?? ''}</div>
                  </div>
              )
          } else {
              return(
                  <div className="description_item">{infosItems.description ?? 'Aucune description'}</div>
              )
          }
      } else {
          return(
              <div className="description_item">{infosItems.description ?? 'Aucune description'}</div>
          )
      }
    
  }

  function getInfosItems(infosItems){
    if(infosItems.details){
         if(infosItems.details.min_power){
             return( 
                 <div>
                 {infosItems.name}<br/><br/>
                 {infosItems.restriction_level ? <div>Lv : <span>{infosItems.restriction_level}</span></div> : ''}
                 Dammage : <span>{infosItems.details.min_power+'-'+infosItems.details.max_power}</span></div> 
             )
         }
         if(infosItems.details.defense){
             return(
                 <div>
                 {infosItems.name}<br/><br/>
                 {infosItems.restriction_level ? <div>Lv : <span>{infosItems.restriction_level}</span></div> : ''}
                 Defense : <span>{infosItems.details.defense}</span></div>
             )
         } else {
             return(
                 <div>{infosItems.name}<br/><br/>{infosItems.restriction_level ? <div>Lv : <span>{infosItems.restriction_level}</span></div> : ''}</div>
             )
         }
    }
 }

  useEffect(() => {
    if(apiKey != null && props.character){
      setBags(false)
      setEquipment(false)
      character_detail(props.character)
      getMoney()
    }
  },[props.character, apiKey])

  

  if(equipment != false){
    if(view == "home"){

      const classImage = images_class.find(
          element => element.id == props.character.profession
      )

      return ( 
        <>
          <Modal  
            show={props.show} 
            onHide={props.onHide}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modalCharacterGeneral"
           
          >
            <Modal.Header id={props.character.profession} className="character_equipment_header">

              <div className="ModalCharacterHeader">
                <CloseIcon  className="closeModalCharacter" onClick={close}/>
                
                <div>
                  <div className="logoProfessionModal">
                    <img src={classImage.src}/>
                    <Modal.Title id="contained-modal-title-vcenter">{props.character.name}</Modal.Title>

                  </div>
                  <div className="details">
                    <div className="detailCard"><span>Level</span><span>{props.character.level}</span></div>
                    <div className="detailCard"><span>Playtime</span><span>{props.character.age / 3600 >= 1 ? parseInt(props.character.age / 3600)+"h" : (props.character.age / 60)+"m"}</span></div>
                    <div className="detailCard"><span>Deaths</span><span>{props.character.deaths}</span></div>
                  </div>
                </div>
              </div>

            </Modal.Header>
            <Modal.Body className="modal_character">
              <div onClick={() => setView("equipment")} className={props.character.profession+" showView"}>
                <img src={equipment_icon}/>
                <span>Équipement</span>
                <ArrowForwardIosIcon/>
              </div>

              <div onClick={() => setView("inventory")} className={props.character.profession+" showView"}>
                <img src={inventory_icon}/>
                <span>Inventaire</span>
                <ArrowForwardIosIcon/>
              </div>
            </Modal.Body>
          </Modal>
        </>
      );
    } else if(view == "inventory"){
      if(bags != false){

        const classImage = images_class.find(
          element => element.id == props.character.profession
        )

        return (
          <>
            <Modal 
              show={props.show} 
              onHide={props.onHide}
              size="sl"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
               <Modal.Header id={props.character.profession}  className="character_equipment_header">
      
                <div className="ModalCharacterHeader">
                <ArrowBackIosIcon  className="returnModalCharacter" onClick={() => setView("home")}/>

                <div>
                  <div className="logoProfessionModal">
                    <Modal.Title id="contained-modal-title-vcenter">Inventaire</Modal.Title>

                  </div>
                </div>
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
                                return(
                                  <Tooltip TransitionComponent={Zoom} title={
                                    <section className="detail_item"> 
                                        {getInfosItems(key2)} 
                                        {getAttributes(key2)}
                                    </section>
                                  } key={index2+'tool_'+key2} >
                                      <td className={key2.rarity} style={{backgroundImage: `url(${key2.icon})`}} key={index2+'tab_'+key2}> 
                                          <span key={'img_'+index2} className='count_item'>{key2.count}</span>
                                      </td>  
                                  </Tooltip>
                                )
                              }
                            })}
                          </tr>
                          )
                        }
                      })}
                  </tbody>
                </table>
              </Modal.Body>
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
              </Modal>
            </>
          );
        }
    } else {
      if(equipment != false){

        const classImage = images_class.find(
          element => element.id == props.character.profession
        )

        return (
          <>
            <Modal 
              show={props.show} 
              onHide={props.onHide}
              size="sl"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header id={props.character.profession}  className="character_equipment_header">
      
                <div className="ModalCharacterHeader">
                <ArrowBackIosIcon  className="returnModalCharacter" onClick={() => setView("home")}/>
        
                <div>
                  <div className="logoProfessionModal">
                    <Modal.Title id="contained-modal-title-vcenter">Équipement</Modal.Title>
                  </div>
                </div>
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
          centered
          className="loaderModal"
        >
          
            <Spinner
              className="loader"
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
          
        </Modal>
      </>
    );
  }

};


export default ModalCharacter;

