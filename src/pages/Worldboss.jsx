import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import worldbossesTimer from '../data/worldboss.json';
import {getWorldbossesKilled, getPermissions} from '../services/gw2API';


// Image of bosses
import ChamanedeSvanir from '../img/bosses/Chamane de Svanir.png';
import Drakkar from '../img/bosses/Drakkar.png';
import Béhémotdesombres from '../img/bosses/Béhémoth des ombres.png';
import Élémentairedefeu from '../img/bosses/Élémentaire de feu.png';
import TaidhaCovington from '../img/bosses/Taidha Covington.png';
import LeDestructeur from '../img/bosses/Le Destructeur.png';
import Mégadestructeur from '../img/bosses/Mégadestructeur.png';
import Guivredelajungle from '../img/bosses/Guivre de la jungle.png';
import UlgothleModniir from '../img/bosses/Ulgoth le Modniir.png';
import TequatlleSanssoleil from '../img/bosses/Tequatl le Sans-soleil.png';
import GriffedeJormag from '../img/bosses/Griffe de Jormag.png';
import Tripleterreur from '../img/bosses/Triple terreur.png';
import Reinekarka from '../img/bosses/Reine karka.png';
import GolemMarqueII from '../img/bosses/Golem Marque II.png';

const Worldboss = (props) => {

    const [worldbosses, setWorldbosses] = useState(false)
    const [worldbossesKilled, setWorldbossesKilled] = useState(false)

    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);


    const images_boss = [
        { id: 'Chamane de Svanir', src: ChamanedeSvanir},
        { id: 'Drakkar', src: Drakkar},
        { id: 'Béhémoth des ombres', src: Béhémotdesombres},
        { id: 'Élémentaire de feu', src: Élémentairedefeu},
        { id: 'Taidha Covington', src: TaidhaCovington},
        { id: 'Le Destructeur', src: LeDestructeur},
        { id: 'Mégadestructeur', src: Mégadestructeur},
        { id: 'Guivre de la jungle', src: Guivredelajungle},
        { id: 'Ulgoth le Modniir', src: UlgothleModniir},
        { id: 'Tequatl le Sans-soleil', src: TequatlleSanssoleil},
        { id: 'Griffe de Jormag', src: GriffedeJormag},
        { id: 'Triple terreur', src: Tripleterreur},
        { id: 'Reine karka', src: Reinekarka},
        { id: 'Golem Marque II', src: GolemMarqueII}
    ];


    var now = new Date();
    var retval = [];

    function formatRemaining(remaining) {
        if (remaining < 0){
            remaining = 0;
        }

        var h = Math.floor(remaining / 60);
        var m = remaining - (h * 60);
        return (("0" + h).slice(-2) + ":" + ("0" + m).slice(-2));
    }

    const fetchBosses = async (schedule = []) => {
       
        worldbossesTimer.map((key, index) => {
            return(
                key.fixed.map(event =>
                    schedule.push([(event[0]) * 60 + event[1], key.name, key.original, key.waypoint])
                ) 
            )
           
        })

        setWorldbosses(schedule)
    }

    function getSchedule(offset){
        worldbosses.map(sch => {
                var entry = {
                key: sch[1],
                original: sch[2],
                waypoint: sch[3],
                remaining: sch[0] - ((now.getUTCHours() * 60) + now.getUTCMinutes()),
                stamp: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), Math.floor(sch[0] / 60), (sch[0] - (Math.floor(sch[0] / 60) * 60)) % 60, 0))
                };
    
                if (entry.remaining < offset) {
                    entry.remaining += 1440;
                    entry.stamp.setDate(entry.stamp.getDate() + 1);
                }
            
                return retval.push(entry);
        })
        // }
        return retval.sort(function (a, b) { return a.remaining - b.remaining });
    }
    

    const getKiled = async (apiKey) => {
        const data = await getWorldbossesKilled(apiKey)
        setWorldbossesKilled(data)
    }

    const permissions = async (apiKey) => {
        const data = await getPermissions(apiKey)

        const progression = data.permissions.find(
            element => element === "progression"
        )
        if(progression){
            getKiled(apiKey)
        }
    }

    useEffect(() => {

        if(apiKey){
            permissions(apiKey)
        }
       
        fetchBosses()
    
        setInterval(function() {
            var rn = new Date();
            var rs = rn.getSeconds();
            // auto refresh table at 0 second
            if (rs === 0){
                if(apiKey){  permissions(apiKey) }
                fetchBosses()
            }
        },1000);
    },[apiKey])
  


    if(worldbosses !== false){
        return (
            <div className="worldbosses">
                <table id="output">
                    <thead>
                        <tr>
                            <th scope="col" className='cell bossname_title'></th>
                            <th scope="col" className='cell bossname_title'>Point de passage</th>
                            <th scope="col" className='cell time_title timestamp'>Heure</th>
                            <th scope="col" className='time_title cell remaining'>Temps</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {getSchedule(-10).map((curr, id) => {
                            const bossImage = images_boss.find(
                                element => element.id === curr.key
                            )

                            if(worldbossesKilled.length > 1){
                                var killed = false
                                worldbossesKilled.map((key, index) => {
                                    if(key === curr.original){
                                        return killed = true
                                    } else {
                                        return false;
                                    }
                                })

                                if(killed){
                                    return(
                                        <tr className="bossKilled" key={"boss_"+id}>
                                            <td className='cell flex-picture'>
                                                <div>{bossImage ? <img alt="" className='bossesPicture' src={bossImage.src}/> : ''}  {curr.key}</div>
                                            </td>
                                            <td data-label="Point de passage" className='waypointBoss'><span>{curr.waypoint}</span></td>
                                            {curr.remaining <= 0 ? <td data-label="Heure" className='cell'>{curr.stamp.toLocaleTimeString()}</td> : <td data-label="Heure" className='cell'>{curr.stamp.toLocaleTimeString()}</td>}
                                            {curr.remaining <= 0 ? <td data-label="Temps" className='cell'>En cours</td> : <td data-label="Temps" className='cell'>dans: {formatRemaining(curr.remaining)}</td>}
                                        </tr>
                                    )
                                } else {
                                    return(
                                        <tr key={"boss_"+id}>
                                            <td  className='cell flex-picture'>
                                                <div>{bossImage ? <img alt="" className='bossesPicture' src={bossImage.src}/> : ''}  {curr.key}</div>
                                            </td>
                                            <td data-label="Point de passage" className='waypointBoss'><span>{curr.waypoint}</span></td>
                                            {curr.remaining <= 0 ? <td data-label="Heure" className='cell in_progress'>{curr.stamp.toLocaleTimeString()}</td> : <td data-label="Heure" className='cell timestamp'>{curr.stamp.toLocaleTimeString()}</td>}
                                            {curr.remaining <= 0 ? <td data-label="Temps" className='in_progress cell'>En cours</td> : <td data-label="Temps" className='cell remaining'>dans: {formatRemaining(curr.remaining)}</td>}
                                        </tr>
                                    )
                                }
                            } else if(worldbossesKilled.length === 1){
                               if(worldbossesKilled[0] === curr.original){
                                return(
                                    <tr className="bossKilled" key={"boss_"+id}>
                                        <td className='cell flex-picture'>
                                            <div>{bossImage ? <img alt="" className='bossesPicture' src={bossImage.src}/> : ''}  {curr.key}</div>
                                        </td>
                                        <td data-label="Point de passage" className='waypointBoss'><span>{curr.waypoint}</span></td>
                                        {curr.remaining <= 0 ? <td data-label="Heure" className='cell'>{curr.stamp.toLocaleTimeString()}</td> : <td data-label="Heure" className='cell'>{curr.stamp.toLocaleTimeString()}</td>}
                                        {curr.remaining <= 0 ? <td data-label="Temps" className='cell'>En cours</td> : <td data-label="Temps" className='cell'>dans: {formatRemaining(curr.remaining)}</td>}
                                    </tr>
                                )
                               } else {
                                return(
                                    <tr key={"boss_"+id}>
                                        <td  className='cell flex-picture'>
                                            <div>{bossImage ? <img alt="" className='bossesPicture' src={bossImage.src}/> : ''}  {curr.key}</div>
                                        </td>
                                        <td data-label="Point de passage" className='waypointBoss'><span>{curr.waypoint}</span></td>
                                        {curr.remaining <= 0 ? <td data-label="Heure" className='cell in_progress'>{curr.stamp.toLocaleTimeString()}</td> : <td data-label="Heure" className='cell timestamp'>{curr.stamp.toLocaleTimeString()}</td>}
                                        {curr.remaining <= 0 ? <td data-label="Temps" className='in_progress cell'>En cours</td> : <td data-label="Temps" className='cell remaining'>dans: {formatRemaining(curr.remaining)}</td>}
                                    </tr>
                                )
                               }
                            } else {
                                return(
                                    <tr key={"boss_"+id}>
                                        <td  className='cell flex-picture'>
                                            <div>{bossImage ? <img alt="" className='bossesPicture' src={bossImage.src}/> : ''}  {curr.key}</div>
                                        </td>
                                        <td data-label="Point de passage" className='waypointBoss'><span>{curr.waypoint}</span></td>
                                        {curr.remaining <= 0 ? <td data-label="Heure" className='cell in_progress'>{curr.stamp.toLocaleTimeString()}</td> : <td data-label="Heure" className='cell timestamp'>{curr.stamp.toLocaleTimeString()}</td>}
                                        {curr.remaining <= 0 ? <td data-label="Temps" className='in_progress cell'>En cours</td> : <td data-label="Temps" className='cell remaining'>dans: {formatRemaining(curr.remaining)}</td>}
                                    </tr>
                                )
                            }
                            
                           
                        })}
                    </tbody>
                </table>
            </div>
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
                style={{color: localStorage.getItem('color') === "default" ? "black" : "white" }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Worldboss);

