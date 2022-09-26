import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import {getCharacters, getItem} from '../services/gw2API';
import Spinner from 'react-bootstrap/Spinner';

const Inventory = (props) => {

    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);
    const [bags, setBags] = useState();
    const [load, setLoad] = useState(false);

    const fetchInventories = async () => {
        try {
            const data = await getCharacters(apiKey);
            setBags(data);
            setLoad(true)
        } catch (error) {
            console.log(error)
        }
      };

    useEffect(() => {
        fetchInventories()
    },[])
  
    function test(){
        return(
            <div>fffff</div>
        )
    }

    if(load == true){
        return (
            <section>
            {bags.map((key, index) => {
                
                // GET BAG FOR EACH CHARACTER
                key.bags.map((key2, index) => {
                  
                    if(key2 != null){
                        // GET ID OF ITEM FOR EACH BAG
                        key2.inventory.map((key3, index) => {
                            if(key3 != null){
                                getItem(key3.id, apiKey).then(item=> 
                                {   
                                    if(item){

                                        // console.log(item.icon)
                                    }
                                })
                            }                                
                        })
                    }
                })
            })}
           
            </section>
        );
    } else {
        return(
            <Spinner
                className="loader"
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);