import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';


const Map = (props) => {

  

    useEffect(() => {
       
    },[])


  
    return(
        <div></div>
    )
   
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);

