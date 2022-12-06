import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect, useMemo } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {getAllItems,getTrading, getAllItemsWithId} from '../services/gw2API';
import { Zoom  } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import gold_icon from "../img/icon/gold.png";
import silver_icon from "../img/icon/silver.png";
import bronze_icon from "../img/icon/bronze.png";
import default_image from "../img/icon/default_image.png";

import DataTable from 'react-data-table-component';
import ClearIcon from '@mui/icons-material/Clear';


import Items from '../data/items.json';


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

         <ClearIcon onClick={onClear}/>
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

    const columns = [
        {
            name: 'Name',
            selector: row =>  
                <div className='trading_item'>
                  <Tooltip TransitionComponent={Zoom} title={
                    <section className="detail_item"> 
                        {getInfosItems(row)} 
                        {getAttributes(row)}
                    </section>
                  }  >
                    <div className={row.rarity} style={{backgroundImage: `url(${row.img})`}}></div>
                  </Tooltip>
                  {row.name}
                </div>,
        },
        {
            name: 'Prix d\'achat',
            selector: row => row.min_sale_unit_price ? currency_calculation(row.min_sale_unit_price) : ' - ',
        },
        {
            name: 'Prix de Vente',
            selector: row => row.max_offer_unit_price ? currency_calculation(row.max_offer_unit_price) : ' - ',
        }
    ];



    const getTradingPost = async () => {

        // for(var k = 0; k<=0; k++){
        //     const data = await getTrading(k)
        //     for(var i = 0; i < data.length; i++){
        //         ids.push(data[i].id)
        //     }
    
        //     const object = await getAllItemsWithId(ids.join(','))
        //     // console.log(object)

        //     ids = []

        //     // if(all_items.length == 0){
        //         all_items = [...all_items,...object];

        //     // } else {
        //         // all_items.concat(object)

        //     // }
        // }
           

        const data = await getAllItems()
        data.results.map((key, index) => {

            const nameFr = Items.find(
                element => element.id == data.results[index].data_id
            )

            if(nameFr) {
                data.results[index].name = nameFr.name
                data.results[index].description = nameFr.description
                data.results[index].details = nameFr.details
                data.results[index].rarity = nameFr.rarity



            } else {
                delete data.results[index]
            }

        })

        setTrading(data.results)
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

