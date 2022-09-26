import '../App.css';
import {connect} from 'react-redux';
import React, { /*useState,*/ useEffect } from 'react';
import {fetchBosses} from '../js/worldsboss';



const Worldboss = (props) => {

useEffect(() => {
    fetchBosses()
    setInterval(function() {
          // $("#nowtime").html(getnowtime());
          var rn = new Date();
          var rs = rn.getSeconds();
          // auto refresh table at 0 second
          if (rs == 0)fetchBosses()
      },1000);
  })
  



    return (
        <div className="worldbosses">
            <table className="table" id="output" ></table>
        </div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(Worldboss);

