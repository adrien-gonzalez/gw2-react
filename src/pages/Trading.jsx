import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {getAllItems} from '../services/gw2API';

import gold_icon from "../img/icon/gold.png";
import silver_icon from "../img/icon/silver.png";
import bronze_icon from "../img/icon/bronze.png";
import ModalItem from "../components/ModalItem";



import { InputText } from 'primereact/inputtext';

import Items from '../data/items.json';



import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const Trading = (props) => {

    const [showModalItem, setShowModalItem] = useState(false);
    const [itemId, setItemId] = useState();
    const [trading, setTrading] = useState(false)
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

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


    const getTradingPost = async () => {

        const object = []
        const data = await getAllItems()
       
        // ["id","buy","sell","supply","demand"]
        data.items.map((key, index) => {

            const nameFr = Items.find(
                element => element.id == data.items[index][0]
            )

            if(nameFr) {
                data.items[index].name = nameFr.name
                data.items[index].description = nameFr.description
                data.items[index].details = nameFr.details
                data.items[index].rarity = nameFr.rarity
                data.items[index].flags = nameFr.flags
                data.items[index].type = nameFr.type
                data.items[index].vendor_value = nameFr.vendor_value
                data.items[index].img = nameFr.icon
                object.push(data.items[index])
            } 
        })

        setTrading(object)
    };


    const clearFilter1 = () => {
        initFilters1();
    }

    const onGlobalFilterChange1 = (e) => {

        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;
        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        setGlobalFilterValue1('');
    }

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Rechercher" />
                </span>
            </div>
        )
    }

    const header1 = renderHeader1();
    const nameItem = (rowData) => {

        return  (
            <div className='trading_item'>
                <div onClick={() => {setShowModalItem(true);setItemId(rowData)}} className={"item_info "+rowData.rarity} style={{backgroundImage: `url(${rowData.img})`}}></div>
                <p>{rowData.name}</p>
            </div>
        )
    }

    const sellPriceItem = (rowData) => {
        return currency_calculation(rowData[1])
    }

    const buyPriceItem = (rowData) => {
        return currency_calculation(rowData[2])
    }


    useEffect(() => {
        
        // if(trading == false){
            getTradingPost()
        // } 
        initFilters1();
    },[])

    
  
    if(trading != false){

        return (  

            <section className="wrapper trading_section">
                 {/* <span className="bank_title trading">Marchand du Lion noir</span> */}
                 <ModalItem  item={itemId} show={showModalItem} close={() => setShowModalItem(false)} />

                <div className="card trading_table">
                    <DataTable  paginator  dataKey="id"   size="small" showGridlines filters={filters1} filterDisplay="menu" value={trading}  
                        responsiveLayout="stack" breakpoint="900px" 
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      rows={10} rowsPerPageOptions={[10,20,50]}
                      paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                      globalFilterFields={['name']} header={header1} emptyMessage="No customers found."
                    >   
                        {/* <Column field="country.name" sortable header="Country" filterField="country.name" body={nameItem} filter filterPlaceholder="Search by country" /> */}
                    
                        <Column field="name" header="Nom" style={{width:'50%'}} body={nameItem}/>
                        <Column sortable field="restriction_level" header="Niveau" />
                        <Column sortable field="min_sale_unit_price" header="Prix d'achat"  body={buyPriceItem}/>
                        <Column sortable field="max_offer_unit_price" header="Prix de vente" body={sellPriceItem} />
                        {/* <Column field="inventoryStatus" header="Status" body={statusTemplate} />
                        <Column field="rating" header="Rating" body={ratingTemplate} /> */}
                    </DataTable>
                </div>
            
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

