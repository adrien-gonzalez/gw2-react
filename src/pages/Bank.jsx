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
    
    const item = async (item, api, count) => {
        const data = await getItem(item, api)
        data.count = count
        return data
    };

    const getBank = async () => {
        try {
            const data = await getBankAccount(apiKey);
            const object = await Promise.all(data.map((key, index) => {
                if(key){
                    return item(key.id, apiKey, key.count)
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

            // 1 or = 100 argent / 10 000 bronze
            // 1 argent = 100 bronze 
            setMoney(object)
        

        } catch (error) {
            console.log(error)
        }
    };

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
                    <span style={{color: localStorage.getItem('color') == "default" ? "black" : "white" }} className="bank_title">Banque</span>
                    <table className="bank_table">
                        <tbody>
                            <tr>
                            {bank.map((key, index) => {
    
                                if(key){
                                    return(
                                        
                                        <Tooltip TransitionComponent={Zoom} title={key.description ?? 'Aucune description'} key={index+'tool_'+key} >
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
                    style={{color: localStorage.getItem('color') == "default" ? "black" : "white" }}
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

