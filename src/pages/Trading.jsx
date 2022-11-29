import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {getTrading, getItem} from '../services/gw2API';
import {  Tooltip, Zoom  } from '@mui/material';

import DataTable from 'react-data-table-component';

const Trading = (props) => {

    const [trading, setTrading] = useState(false)

 

    const ExpandedComponent = ({ data }) => {
       
           
        return (
        <pre>
            {data.buys.map((key, index)=> { 
                return (
                    <div>{key.unit_price ?? ' - '}</div>
                )
            })}
        </pre>
        )
       
    };

   

    const columns = [
        {
            name: 'Name',
            selector: row => <div className='trading_item'><div className={row.rarity} style={{backgroundImage: `url(${row.icon})`}}></div>{row.name}</div>,//row => row.level ? row.name+' - Niv. '+row.level : row.name,
        },
        {
            name: 'Prix d\'achat',
            selector: row => row.sells[0] ? row.sells[0].unit_price : ' - ',
        },
        {
            name: 'Prix de Vente',
            selector: row => row.buys[0] ? row.buys[0].unit_price : ' - ',
        }
    ];
    


    const item = async (key, item) => {
        const item_data = await getItem(item)
        key.icon = item_data.icon ?? null
        key.name = item_data.name ?? null
        key.rarity = item_data.rarity ?? null
        key.level = item_data.level ?? null
        return key
    };

    const getTradingPost = async () => {
        try {
            const data = await getTrading();
            const object = await Promise.all(data.map((key, index) => {
                if(key){
                    return item(key, key.id)
                }
            }))
            setTrading(object)
            // console.log(object[0].buys[0].unit_price)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getTradingPost()
    },[])

    if(trading != false){
        return (
            <section className="wrapper trading_section">
                <span style={{color: localStorage.getItem('color') == "dark" ? "white" : "black" }} className="bank_title">Trading</span>
               

                <DataTable
                    className="trading_table"
                    columns={columns}
                    data={trading}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Trading);

