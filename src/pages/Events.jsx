import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
// import useScreenOrientation from 'react-hook-screen-orientation';
import useOrientationChange from "use-orientation-change";
import Spinner from 'react-bootstrap/Spinner';
import eventsEng from '../data/events.json';
import eventsFr from '../data/events_fr.json';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';

const Events = (props) => {


    const [pointerTime, setPointerTime] = useState("");
    const [pointerLocalTime, setPointerLocalTime] = useState("");
    const [pointerPosition, setPointerPosition] = useState("");
    const [events, setEvents] = useState(false)
    const orientation = useOrientationChange()
    const [color, setColor] = useState(localStorage.getItem('color') ?? 'default');
    const localTime =  moment();

    // Besoin de condition si heure d'été ou hiver
    // ETE
    // const startHour = Math.floor(localTime.hour() / 2) * 2;
    // HIVER
    const startHour = isFloat(localTime.hour() / 2) ? Math.floor(localTime.hour() / 2) * 2 + 1 : Math.floor(localTime.hour() / 2) * 2 - 1;


    function isFloat(n) {
        return n === +n && n !== (n|0);
    }

    function movePointer() {
       
        let currentTime = moment.utc();
        let localTime = moment();
    
        // Format with leading 0s so 09:08 doesn't end up as 9:8
        let hour = ("00" + currentTime.hour()).slice(-2);
        let minute = ("00" + currentTime.minute()).slice(-2);
    
        let localHour = ("00" + localTime.hour()).slice(-2);
        let localMinute = ("00" + localTime.minute()).slice(-2);
    
        // How far along are we (in  % ) of the current 2 hour event cycles?
        let percentOfTwoHours = ((hour % 2) + minute / 60) * 50;
        
        // // Set the text and move the pointer to that %
        setPointerTime(hour + ":" + minute);
        setPointerLocalTime(localHour + ":" + localMinute);
        setPointerPosition(percentOfTwoHours);
    }

    function calcPhaseWidth(duration) {
        return (100 * duration) / 120;
    }

    function textColor(textColor) {
        return textColor === "light" ? "white" : "black";
    }

    useEffect(() => {
        // OrientationChange()

        if(moment.tz.guess() === "Europe/Paris"){
            setEvents(eventsFr)
        } else {
            setEvents(eventsEng)
        }
        
        movePointer()

        setInterval(function() {
            movePointer()
        },1000);

        if(props.appColor.color !== 0){
            setColor(props.appColor.color)
        }

    },[pointerLocalTime, pointerTime, events, props, color])
  


    if(events !== false){
        if(orientation === "landscape" || window.innerWidth > 900)
        {
            return (
                <section className="meta-section">
                    <div className="meta-container">
                        <div className={color === "default" ? "blackColor pointer" : "whiteColor pointer"} style={{left: pointerPosition+'%'}}>
                            {pointerPosition > 7 ? <span className="local"><strong >Heure Serveur</strong><span style={{color: 'black'}}>{pointerTime}</span></span> : ""}
                            {pointerPosition < 93 ? <span className="server"><strong>Heure locale</strong><span>{pointerLocalTime}</span></span> : ""}
                        </div>
                        {events.map((key, index) => {
                            let offset = 0;
                            let notEvent = true;

                            let plusProcheAuDessus = Infinity;
                                if(key.show !== false){
                                    return(
                                        <div key={'meta_'+index} className="meta">
                                            {key.category_name ? <div className={index === 0 ? "first category_name" : "not_first_category category_name"}>{key.category_name}</div> : ""}
                                            <span className="meta-name">{key.name}</span>
                                            <div className="bar">
                                                
                                                {key.phases.map((phase, index2) => {
                                                    
                                                    // For event time up = fixed or > 2 hours
                                                    if(key.fixed){
                                                        let correctedTime = "" + (startHour + (offset > 59 ? 1 : 0));
                                                        let timeUp = phase[0];
                                                        let show = false;
                                                        
                                                        if (timeUp > parseInt(correctedTime) + 2 && timeUp < plusProcheAuDessus) {
                                                            plusProcheAuDessus = timeUp;
                                                        }


                                                        if(timeUp > parseInt(correctedTime) && timeUp < parseInt(correctedTime) + 2){
                                                            show = true  
                                                            notEvent = false
                                                        }


                                                        if(show){
                                                            // Heure de début du créneau en heures et minutes
                                                            var heureDebut = parseInt(correctedTime);
                                                            var minuteDebut = 0;

                                                            // Heure donnée en heures et minutes
                                                            var heureDonnee = parseInt(timeUp);
                                                            var minuteDonnee = parseInt(timeUp.toString().substr(3,3)) * 10;

                                                         

                                                            // Convertir les heures en minutes
                                                            var debutEnMinutes = heureDebut * 60 + minuteDebut;
                                                            var donneeEnMinutes = heureDonnee * 60 + minuteDonnee;
                                                            var creneaux_1 = donneeEnMinutes - debutEnMinutes
                                                            var next_hour = parseInt(minuteDonnee) + parseInt(key.duration) < 60 ? heureDonnee+" : "+(parseInt(minuteDonnee) + parseInt(key.duration)) : ""
                                                          
                                                            return(
                                                                <div key={"event_"+index2} className="event_fixed">
                                                                    {timeUp > parseInt(correctedTime) 
                                                                    ?
                                                                        <div style={{background: key.color, color: textColor(key.text), width:'calc('+calcPhaseWidth(creneaux_1)+'% - .25rem)'}} key={'phase1'+index2} className="phase">
                                                                            <div className="phase-time">{correctedTime+" : 00"}</div>
                                                                            <div className="phase-name"></div>
                                                                        </div>  
                                                                
                                                                
                                                                    : ''
                                                                    }
                                                                   
                                                                    <div style={{background: key.color, color: textColor(key.text), width:'calc('+calcPhaseWidth(key.duration)+'% - .25rem)'}} key={'phase'+index2} className="phase">
                                                                        <div className="phase-time">{timeUp.toString().replace('.', ' : ')+"0"}</div>
                                                                        <div className="phase-name">{key.event_name}</div>
                                                                    </div>  

                                                                    {timeUp < parseInt(correctedTime) + 2 
                                                                    ?
                                                                        <div style={{background: key.color, color: textColor(key.text), width:'calc('+calcPhaseWidth(120 - creneaux_1 - key.duration)+'% - .25rem)'}} key={'phase2'+index2} className="phase">
                                                                            <div className="phase-time">{next_hour}</div>
                                                                            <div className="phase-name"></div>
                                                                        </div>  
                                                                    : ''
                                                                    }
                                                                </div>
                                                               
                                                            )
                                                        } else if(index2 === key.phases.length - 1 && notEvent){
                                                            return(
                                                                <div style={{background: key.color, color: textColor(key.text), width:'calc('+calcPhaseWidth(120)+'% - .25rem)'}} key={'phase'+index2} className="phase">
                                                                    <div className="phase-time">{correctedTime+" : 00"}</div>
                                                                    <div className="phase-name">Prochain évènement à {parseFloat(plusProcheAuDessus).toFixed(2)}</div>
                                                                </div>  
                                                            ) 
                                                        }
                                                    } else {
                                                        let correctedTime = "" + (startHour + (offset > 59 ? 1 : 0));
                                                        phase.hour = correctedTime.slice(-2) < 24 ? ("00" + correctedTime).slice(-2) : "00";
                                                        phase.minute = ("00" + (offset % 60)).slice(-2);
                                                        offset += phase.duration;
            
                                                            return(
                                                                <div style={{background: phase.color, color: textColor(phase.text), width:'calc('+calcPhaseWidth(phase.duration)+'% - .25rem)'}} key={'phase'+index2} className="phase">
                                                                    <div className="phase-time">{phase.hour} : {phase.minute}</div>
                                                                    <div className="phase-name">{phase.name}</div>
                                                                </div>
                                                            )
                                                    }
 
                                                })}
                                            </div>
                                        </div>
        
                                    )
                                } 
                        })}
                    </div>
                    <span className={color === "default" ? "blackColorSpan basedPage" : "whiteColorSpan basedPage"}>This page is based on the <a href="https://gw2.ninja/timer">Guild Wars 2 Event Timer</a> by <a href="https://twitch.tv/rediche">Rediche.</a></span>
                </section>
            ); 
        } else {
            return(
                <div>
                    <ScreenRotationIcon style={{color: localStorage.getItem('color') === "default" ? "black" : "white" }} className="changeOrientation"></ScreenRotationIcon>
                </div>
            )
        }
    } else {
        return(
            <Spinner
                className="loader"
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
                style={{color: localStorage.getItem('color') === "default" ? "black" : "white" }}
            /> 
        )
    }
    
}



// RECUP DU STORE REDUX
const mapStateToProps = ({ apiKey, appColor }) => ({
    apiKey,
    appColor
  });
// DISPATCH ACTIONS
const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);

