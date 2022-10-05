import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';

import Spinner from 'react-bootstrap/Spinner';
import eventsEng from '../data/events.json';
import eventsFr from '../data/events_fr.json';



const Events = (props) => {

    const [pointerTime, setPointerTime] = useState("");
    const [pointerLocalTime, setPointerLocalTime] = useState("");
    const [pointerPosition, setPointerPosition] = useState("");
    const [events, setEvents] = useState(false)


    let currentTime = moment.utc();
    let startHour = Math.floor(currentTime.hour() / 2) * 2;
    let offset = 0;


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

        if(moment.tz.guess() == "Europe/Paris"){
            setEvents(eventsFr)
        } else {
            setEvents(eventsEng)
        }
        
        movePointer()

        setInterval(function() {
            movePointer()
        },1000);

    },[])
  


    if(events != false){

        return (
            <section className="meta-section">
                <div className="meta-container">

                    <div className="pointer" style={{left: pointerPosition+'%'}}>
                        <span className="server">
                            <strong>Heure Serveur</strong>
                            <span>{pointerTime}</span>
                        </span>
                        <span className="local">
                            <strong>Heure locale</strong>
                            <span>{pointerLocalTime}</span>
                        </span>
                    </div>

                    {events.map((key, index) => {


                        return(
                            <div key={'meta_'+index} className="meta">
                                <span className="meta-name">{key.name}</span>

                                <div className="bar">
                                    {key.phases.map((phase, index2) => {
                                        let correctedTime = "" + (startHour + (offset > 59 ? 1 : 0));
                                        phase.hour = ("00" + correctedTime).slice(-2);
                                        phase.minute = ("00" + (offset % 60)).slice(-2);
                                        offset += phase.duration;

                                        return(
                                            <div style={{background: phase.color, color: textColor(phase.text), width: 'calc('+calcPhaseWidth(phase.duration)+'% - .25rem)'}} key={'phase'+index2} className="phase">
                                                <div className="phase-time">{phase.hour} : {phase.minute}</div>
                                                <div className="phase-name">{phase.name}</div>

                                            </div>
                                        )
                                        
                                    })}
                                </div>
                            </div>

                        )

                
                        
                    })}
                </div>
                <span className='basedPage'>This page is based on the <a href="https://gw2.ninja/timer">Guild Wars 2 Event Timer</a> by <a href="https://twitch.tv/rediche">Rediche.</a></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Events);

