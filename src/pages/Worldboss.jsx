import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

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

    const worldbossesTimer = {
        "Drakkar": { repeat: { start: [1, 5], interval: 2 } },
        "Taidha Covington": { repeat: { start: [0, 0], interval: 3 } },
        "Chamane de Svanir": { repeat: { start: [0, 15], interval: 2 } },
        "Mégadestructeur": { repeat: { start: [0, 30], interval: 3 } },
        "Élémentaire de feu": { repeat: { start: [0, 45], interval: 2 } },
        "Le Destructeur": { repeat: { start: [1, 0], interval: 3 } },
        "Guivre de la jungle": { repeat: { start: [1, 15], interval: 2 } },
        "Ulgoth le Modniir": { repeat: { start: [1, 30], interval: 3 } },
        "Béhémoth des ombres": { repeat: { start: [1, 45], interval: 2 } },
        "Élémentaire de feu": { repeat: { start: [2, 45], interval: 2 } },
        "Tequatl le Sans-soleil": { fixed: [[23, 55], [2, 55], [6, 55], [11, 25], [15, 55], [18, 55]] },
        "Griffe de Jormag": { repeat: { start: [2, 30], interval: 3 } },
        "Triple terreur": { fixed: [[0, 55], [3, 55], [7, 55], [12, 25], [16, 55], [19, 55]] },
        "Reine karka": { fixed: [[1, 55], [5, 55], [10, 25], [14, 55], [17, 55], [22, 55]] },
        "Golem Marque II": { repeat: { start: [2, 0], interval: 3 } },
    }
  

    const schedule = []
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

    const fetchBosses = async () => {

        Object.keys(worldbossesTimer).forEach(function (key, index) {

            // Events that repeats every X hours
            if (worldbossesTimer[key].repeat !== undefined) {
                var event = worldbossesTimer[key].repeat.start;
                while (event[0] < 24) {
                    schedule.push([(event[0] * 60) + event[1], key]);
                    event[0] += worldbossesTimer[key].repeat.interval;
                }
            }
           
            // Fixed events
            if (worldbossesTimer.fixed !== undefined) {
      
                worldbossesTimer.fixed.map(event =>
                schedule.push([(event[0]) * 60 + event[1], key])
              )
                
            }
        });

    }

    function getSchedule(offset){
        worldbosses.map(sch => {
                var entry = {
                key: sch[1],
                remaining: sch[0] - ((now.getUTCHours() * 60) + now.getUTCMinutes()),
                stamp: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), Math.floor(sch[0] / 60), (sch[0] - (Math.floor(sch[0] / 60) * 60)) % 60, 0))
                };
    
                if (entry.remaining < offset) {
                    entry.remaining += 1440;
                    entry.stamp.setDate(entry.stamp.getDate() + 1);
                }
            
                retval.push(entry);
        })
        // }
        return retval.sort(function (a, b) { return a.remaining - b.remaining });
    }
    


    useEffect(() => {
        fetchBosses()
        setWorldbosses(schedule)

        setInterval(function() {
            var rn = new Date();
            var rs = rn.getSeconds();
            // auto refresh table at 0 second
            if (rs == 0){
                fetchBosses()
                setWorldbosses(schedule)
            }
        },1000);
    },[])
  


    if(worldbosses != false){
        var current = getSchedule(-10);

        return (
            <div className="worldbosses">
                <table className="table" id="output" >
                    <tbody>
                        <tr>
                            <td className='cell bossname_title'>Nom du Boss</td>
                            <td className='cell time_title timestamp'>Heure</td>
                            <td className='time_title cell remaining'>Temps</td>
                        </tr>
                        {current.map((curr, id) => {
                            const bossImage = images_boss.find(
                                element => element.id == curr.key
                            )

                            return(
                                <tr key={"boss_"+id}>
                                    <td className='cell flex-picture'>
                                        {bossImage ? <img alt="" className='bossesPicture' src={bossImage.src}/> : ''}
                                        {curr.key}
                                    </td>
                                    <td className='cell timestamp'>{curr.stamp.toLocaleTimeString()}</td>
                                    <td className='cell remaining'>dans: {formatRemaining(curr.remaining)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        ); 
    } else {
        return (
            <div className="worldbosses">
                <table className="table" id="output" ></table>
            </div> 
        ); 
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

