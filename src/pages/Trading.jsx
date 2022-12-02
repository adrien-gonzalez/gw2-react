import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect, useMemo } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {getTrading, getItem} from '../services/gw2API';
import {  Tooltip, Zoom  } from '@mui/material';
import gold_icon from "../img/icon/gold.png";
import silver_icon from "../img/icon/silver.png";
import bronze_icon from "../img/icon/bronze.png";
import DataTable from 'react-data-table-component';
import ClearIcon from '@mui/icons-material/Clear';
import { fireEvent } from '@testing-library/react';
import { ConstructionOutlined } from '@mui/icons-material';

const Trading = (props) => {
    
    const [trading, setTrading] = useState(false)
    const [page, setPage] = useState(1)
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    
  
    const FilterComponent = ({ filterText, onFilter, onClear }) => (
        <>
            <input
                autoFocus
                className="search_post_trading"
                type="text"
                placeholder="Rechercher"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
            />

            <button className="onClearButton" type="button" onClick={onClear}><ClearIcon/></button>
            {/* <button className="onClearButton" type="button" onClick={onClear}>X</button> */}
        </>
    );

	const subHeaderComponentMemo = useMemo(() => {
      
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};


		return (
            <FilterComponent filterText={filterText}  onFilter={e =>  setFilterText(e.target.value)} onClear={handleClear}    />
		);
	}, [filterText, resetPaginationToggle]);

    // const ExpandedComponent = ({ data }) => {
    //     return (
    //     <pre>
    //         {data.buys.map((key, index)=> { 
    //             return (
    //                 <div>{key.unit_price ?? ' - '}</div>
    //             )
    //         })}
    //     </pre>
    //     )
       
    // };

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

    const columns = [
        {
            name: 'Name',
            selector: row => <div className='trading_item'><div className={row.rarity} style={{backgroundImage: `url(${row.icon})`}}></div>{row.name}</div>,//row => row.level ? row.name+' - Niv. '+row.level : row.name,
        },
        {
            name: 'Prix d\'achat',
            selector: row => row.sells ? currency_calculation(row.sells.unit_price) : ' - ',
        },
        {
            name: 'Prix de Vente',
            selector: row => row.buys ? currency_calculation(row.buys.unit_price) : ' - ',
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

    const tradingData = []

    const getTradingPost = async () => {
       
        try {
            const data = await getTrading(page);
            const object = await Promise.all(data.map((key, index) => {
                if(key){
                    return item(key, key.id)
                }
            }))
            
            setTrading(object)
            
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if(trading == false){
            getTradingPost()

        }
    },[])

    if(trading != false){
        

        const filteredItems = trading.filter(
            item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
        );


        return (  
            <section className="wrapper trading_section">
                <span style={{color: localStorage.getItem('color') == "dark" ? "white" : "black" }} className="bank_title">Trading</span>

                <DataTable
                    className="trading_table"
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    // persistTableHead
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

