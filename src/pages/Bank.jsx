import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {getBankAccount, getItem} from '../services/gw2API';
import {  Tooltip, Zoom  } from '@mui/material';

const Bank = (props) => {

    const [bank, setBank] = useState(false)
    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);
    const item_count = []

    
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
                    item_count.push(key)
                    return item(key.id, apiKey, key.count)
                }
            }))
            setBank(object)
        } catch (error) {
            console.log(error)
        }
      };

    useEffect(() => {
        if(apiKey != null){
            getBank()
        }
    },[apiKey])



    if(bank != false){
        return (
            <section className="wrapper">
                <span className="bank_title">Banque</span>
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
            /> 
        ); 
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

