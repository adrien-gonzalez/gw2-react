import '../App.css';
import {connect} from 'react-redux';
import React, {useEffect, useState } from 'react';
import {characters} from '../js/characters';
import Spinner from 'react-bootstrap/Spinner';


const Characters = (props) => {

    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);

    

    useEffect(() => {
        if(apiKey != null){
            characters(apiKey)
        }
    },[])

    if(apiKey){
        return (
            <section className="wrapper charactersSection">
                <Spinner
                    className="loader"
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                    />
                <div id="characters"></div>
            </section>
        ); 
    } else {
        return (
            <div className="things">
                <div className="content">
                    <div className="arrow">
                    <div className="curve"></div>
                    <div className="point"></div>
                    </div>
                </div> 
                <div className="content">
                    <span>Veuillez ajouter votre clé</span>
                </div>
                </div>
            // <h2 className="need_api_key">Veuillez ajouter votre clé API pour accèder à cette rubrique</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(Characters);

