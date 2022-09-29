import '../App.css';
import {connect} from 'react-redux';
import React, {useEffect, useState } from 'react';
// import {characters} from '../js/characters';
import Spinner from 'react-bootstrap/Spinner';
import {getCharacters} from '../services/gw2API';

import ModalCharacter from "../components/ModalAuth";

const Characters = (props) => {

    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);
    const [character, setCharacter] = useState();
    const [load, setLoad] = useState(false);

    // const [showModalAuth, setShowModalAuth] = useState(false);


    const characters = async () => {
        try {
            const data = await getCharacters(apiKey);
            setCharacter(data)
            setLoad(true)
        } catch (error) {
            console.log(error)
        }
      };


    useEffect(() => {
        if(apiKey != null){
            characters()
        }
    },[])


    if(apiKey){
        if(load == true){
            return (
                <section className="wrapper charactersSection">
                    <div id="characters">
                        {character.map((key, index) => {
                            return(
                                <div className='characterForm'>
                                    <div class='picture'>
                                        <div className='nameAndProfession'>
                                            <div className='name'>{key.name} - Lv. {key.level} - {key.race}</div>
                                            <div>{key.profession}</div>
                                            {key.crafting.map((key2, index2) => {
                                                return(
                                                    <div className='craftList'>
                                                        <div className='craftListActive crafting'>
                                                            <div className='crafting'>
                                                                {/* <img src='"+Artificer+"'/> */}
                                                                <span>{key2.discipline} - lv. {key2.rating}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                // <div key={key.name}>{key.name}</div>
                            )
                        })}
                    </div>
                </section>
            )
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
            )
        } 
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

