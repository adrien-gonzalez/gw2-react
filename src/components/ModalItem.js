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

import gold_icon from "../img/icon/gold.png";
import silver_icon from "../img/icon/silver.png";
import bronze_icon from "../img/icon/bronze.png";

const ModalItem = (props) => {

  const [items, setItems] = useState(false);

  function getInfosItems(infosItems){
    if(infosItems.details){
         if(infosItems.details.min_power){
             return( 
                 <div className="item_power">Dammage : <span>{infosItems.details.min_power+'-'+infosItems.details.max_power}</span></div> 
             )
         }
         if(infosItems.details.defense){
             return(
                 <div className="item_defense">Defense : <span>{infosItems.details.defense}</span></div>
             )
         }
    }
 }

 function getAttributes(infosItems){
       
    if(infosItems.details){
        if(infosItems.details.infix_upgrade){
            return(
                <div className="item_attributes">
                    {infosItems.details.infix_upgrade.attributes.map((key, index) => {
                        return(
                            <div key={infosItems.id+'_'+key.attribute}>{key.attribute}<span> +{key.modifier}</span></div>

                        )
                    })}
                    
                        <div className="item_description">{infosItems.description ?? ''}</div>
                </div>
            )
        } else {
            return(
                <div className="item_description">{infosItems.description ?? 'Aucune description'}</div>
            )
        }
    } else {
        return(
            <div className="item_description">{infosItems.description ?? 'Aucune description'}</div>
        )
    }
  
  }

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
      <span className="count_gold_price">
        
        {gold != 0 ? <div className="gold_number">{gold}<div style={{backgroundImage: `url(${gold_icon})`}}></div></div> : ''}
        {silver != 0 || gold != 0 ? <div className="gold_number">{silver}<div style={{backgroundImage: `url(${silver_icon})`}}></div></div> : ''}
        {bronze != 0 ? <div className="gold_number">{bronze}<div style={{backgroundImage: `url(${bronze_icon})`}}></div></div> : ''}
      </span>
    )
  }

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
                  <div className="item_name">
                      <div className={items.item.rarity} style={{backgroundImage: `url(${items.item.img})`}}/>
                      <span className={items.item.rarity+'_text'}>{items.item.name}</span>
                  </div>

                  {getInfosItems(items.item)}
                  {getAttributes(items.item)}
                  
                  <div className="item_details_type">
                    <span>{items.item.rarity}</span>
                    {items.item.details ? <span>{items.item.details.type}</span> : ''}
                  </div>

                  <div className="item_specification">
                    {items.item.restriction_level != 0 ? <span>Niveau requis : {items.item.restriction_level}</span> : ''}
                    <span className="item_type">({items.item.type})</span>
                    <span>{items.item.flags == "SoulBindOnUse" ? "Liée à l'âme dès l'utilisation" : ''}</span>
                  </div>

                  <div className="item_value">
                    {currency_calculation(items.item.vendor_value)}
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


