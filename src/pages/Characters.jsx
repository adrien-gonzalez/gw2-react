import '../App.css';
import {connect} from 'react-redux';
import React, {useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {getCharacters} from '../services/gw2API';
import ModalCharacter from "../components/ModalCharacter";

// Image of craft
import Armorsmith from '../img/craft/Armorsmith.png';
import Artificer from '../img/craft/Artificer.png';
import Chef from '../img/craft/Chef.png';
import Huntsman from '../img/craft/Huntsman.png';
import Jeweler from '../img/craft/Jeweler.png';
import Leatherworker from '../img/craft/Leatherworker.png';
import Scribe from '../img/craft/Scribe.png';
import Tailor from '../img/craft/Tailor.png';
import Weaponsmith from '../img/craft/Weaponsmith.png';


// Image of character
import Elementalist from '../img/personnages/Elementalist.png';
import Guardian from '../img/personnages/Guardian.png';
import Mesmer from '../img/personnages/Mesmer.png';
import Necromancer from '../img/personnages/Necromancer.png';
import Ranger from '../img/personnages/Ranger.png';
import Revenant from '../img/personnages/Revenant.png';
import Thief from '../img/personnages/Thief.png';
import Warrior from '../img/personnages/Warrior.png';

const Characters = (props) => {

    const [showModalCharacter, setShowModalCharacter] = useState(false);
    const [characterId, setCharacterId] = useState();

    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);
    const [character, setCharacter] = useState(false);


    const images_class = [
        { id: 'Elementalist', src: Elementalist},
        { id: 'Guardian', src: Guardian},
        { id: 'Mesmer', src: Mesmer},
        { id: 'Necromancer', src: Necromancer},
        { id: 'Ranger', src: Ranger},
        { id: 'Revenant', src: Revenant},
        { id: 'Thief', src: Thief},
        { id: 'Warrior', src: Warrior},
    ];

    const images_craft = [
        { id: 'Armorsmith', src: Armorsmith},
        { id: 'Artificer', src: Artificer},
        { id: 'Chef', src: Chef},
        { id: 'Huntsman', src: Huntsman},
        { id: 'Jeweler', src: Jeweler},
        { id: 'Leatherworker', src: Leatherworker},
        { id: 'Scribe', src: Scribe},
        { id: 'Tailor', src: Tailor},
        { id: 'Weaponsmith', src: Weaponsmith},

    ];

    const characters = async () => {
        
       
        try {
            const data = await getCharacters(apiKey);
            setCharacter(data)
        } catch (error) {
            console.log(error)
        }
      };


    useEffect(() => {
        if(apiKey != null){
            characters()
        }
    },[apiKey])


    if(apiKey){
        if(character != false){
            return (
                <section className="wrapper charactersSection">
                    <div id="characters">
                        <ModalCharacter  character={characterId} show={showModalCharacter} close={() => setShowModalCharacter(false)} />
                        {character.map((key, index) => {

                            const classImage = images_class.find(
                                element => element.id == key.profession
                            )
                            return(
                                
                                <div onClick={() => {setShowModalCharacter(true);setCharacterId(key)}} key={'character_'+index} className='characterForm' id={key.profession}>
                                    <div className='nameAndProfession'>
                                        <div className='name'>{key.name} - Lv. {key.level} - {key.race}</div>
                                        <div>{key.profession}</div>
                                    </div>
                                    <div className='picture' id='picture"+key+"' style={{backgroundImage: `url(${classImage.src})`, backgroundSize: 'cover'}}></div>
                                        <div className='craftList'>
                                            <div className='craftListActive crafting'>
                                                {key.crafting.map((key2, index2) => {

                                                    const craftImage = images_craft.find(
                                                        element => element.id == key2.discipline
                                                    )
                                                    if (key2.active == true) {
                                                        return(
                                                            <div key={'craft_'+index2} className='crafting'>
                                                                <img src={craftImage.src}/>
                                                                <span>{key2.discipline} - lv. {key2.rating}</span>
                                                            </div>   
                                                        )
                                                    }                                                    
                                                })}
                                            </div>
                                        </div>
                                </div>
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

