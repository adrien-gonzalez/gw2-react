import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import {getCharacters} from '../services/gw2API';

const Inventory = (props) => {

    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);

    useEffect(() => {
        getCharacters(apiKey).then(response=> 
            { 
                if(response){
                    Object.keys(response).forEach(function (key, index) {
                        console.log(response[key].name)
                        Object.keys(response[key].bags).forEach(function (key2, index) {
                            if(response[key].bags[key2] != null){
                                console.log(response[key].bags[key2].inventory)
                            }

                        })

                    })

                }
            })
    })
  



    return (
       "ee"
    ); 
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