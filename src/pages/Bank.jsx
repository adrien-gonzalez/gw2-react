import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {getBankAccount, getItem, getWallet, getCurrencies} from '../services/gw2API';
import {  Tooltip, Zoom  } from '@mui/material';

const Bank = (props) => {

    const [bank, setBank] = useState(false)
    const [money, setMoney] = useState(false)
    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);
    
    const item = async (item, count) => {
        const data = await getItem(item)
        data.count = count
        return data
    };

    const getBank = async () => {
        try {
            const data = await getBankAccount(apiKey);
            const object = await Promise.all(data.map((key, index) => {
                if(key){
                    return item(key.id, key.count)
                }
            }))
            setBank(object)
        } catch (error) {
            console.log(error)
        }
    };


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

            setMoney(object)
        

        } catch (error) {
            console.log(error)
        }
    };

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
                    <div>Dammage : <span>{infosItems.details.min_power+'-'+infosItems.details.max_power}</span></div> 
                )
            }
            if(infosItems.details.defense){
                return(
                    <div>Defense : <span>{infosItems.details.defense}</span></div>
                )
            }
       }
    }

    useEffect(() => {
        if(apiKey != null){
            getBank()
            getMoney()
        }
    },[apiKey])


    if(apiKey){
        if(bank != false && money != false){
            return (
                <section className="wrapper">
                    <span  className="bank_title">Banque</span>
                    <table className="bank_table">
                        <tbody>
                            <tr>
                            {bank.map((key, index) => {
    
                                if(key){
                                    return(
                                        
                                        <Tooltip TransitionComponent={Zoom} title={
                                            <section className="detail_item"> 
                                                {getInfosItems(key)} 
                                                {getAttributes(key)}
                                            </section>

                                        } key={index+'tool_'+key} >
                                            <td className={key.rarity} style={{backgroundImage: `url(${key.icon})`}} key={index+'tab_'+key}> 
                                                <span key={'img_'+index} className='count_item_bank'>{key.count}</span>
                                            </td>  
                                        </Tooltip>
                                        
                                    )    
                                }
                               
                          })}
                          </tr>
                      </tbody>
                    </table>
                </section>
            ); 
        } else {
            return (
                <Spinner
                    className="loader"
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                    style={{color: localStorage.getItem('color') == "dark" ? "white" : "black" }}
                /> 
            ); 
        }
    } else {
        return(
            <div></div>
        )
    }
   
       
   
   
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

export default connect(mapStateToProps, mapDispatchToProps)(Bank);

