import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker,useMap ,SVGOverlay} from 'react-leaflet'
import L, {CRS} from 'leaflet';

import core from "../img/icon/core.png";
import heroChallenge from "../img/icon/heroChallenge.png";
import pointInterest from "../img/icon/pointInterest.png";
import waypoint from "../img/icon/waypoint.png";
import vista from "../img/icon/vista.png";

import  maps from '../data/maps.json';
import  mapsAll from '../data/mapsALL.json';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import zIndex from '@mui/material/styles/zIndex';






const Map = (props) => {

  const [fullScreen, setFullScreen] = useState(false)

  var tasks = []
  var points_of_interest = []
  var sectors = []
  var skill_challenges = []
  var continent = []
  var waypointMap = []


  var CoreIcon = L.icon({
    iconUrl: core,
    iconSize:     [24, 24], 
    className: "core" 
  });

  var heroChallengeIcon = L.icon({
    iconUrl: heroChallenge,
    iconSize:     [24, 24],
    className: "hero" 
  });

  var pointInterestIcon = L.icon({
    iconUrl: pointInterest,
    iconSize:     [12, 12], 
    className: "point" 
  });

  var wayPointIcon = L.icon({
    iconUrl: waypoint,
    iconSize:     [24, 24], 
    className: "waypoint" 
  });

  var vistaIcon = L.icon({
    iconUrl: vista,
    iconSize:     [24, 24], 
    className: "vista" 
  });




  function LocationMarker() {

    const map = useMap()

      for(var i = 0; i < Object.keys(mapsAll[1].maps).length; i++){
        var maps = mapsAll[1].maps[Object.keys(mapsAll[1].maps)[i]]
       
        if(Object.keys(maps.tasks).length > 0){
          Object.keys(maps.tasks).map((key, index)=> { 
            tasks.push([{'coord' : map.unproject(maps.tasks[key].coord,map.getMaxZoom()), 'type' : 'CoreIcon'}])
          })
        }

        if(Object.keys(maps.points_of_interest).length > 0){
          Object.keys(maps.points_of_interest).map((key, index)=> { 
            points_of_interest.push([{'coord' : map.unproject(maps.points_of_interest[key].coord,map.getMaxZoom()), 'type' : 'pointInterestIcon'}])
          })
        }

        if(Object.keys(maps.skill_challenges).length > 0){
          Object.keys(maps.skill_challenges).map((key, index)=> { 
            skill_challenges.push([{'coord' : map.unproject(maps.skill_challenges[key].coord,map.getMaxZoom()), 'type' : 'heroChallengeIcon'}])
          })
        }

        if(Object.keys(maps.vista).length > 0){
          Object.keys(maps.vista).map((key, index)=> { 
            sectors.push([{'coord' : map.unproject(maps.vista[key].coord,map.getMaxZoom()), 'type' : 'vistaIcon'}])
          })
        }

        if(Object.keys(maps.waypoint).length > 0){
          Object.keys(maps.waypoint).map((key, index)=> { 
            waypointMap.push([{'coord' : map.unproject(maps.waypoint[key].coord,map.getMaxZoom()), 'type' : 'wayPointIcon'}])
          })
        }
      }

  
    var allMarkers = skill_challenges.concat(sectors, points_of_interest, tasks, waypointMap)
  
    return(
      allMarkers.map((key, index)=> { 
          // console.log(key[0].coord)

        if(key[0].type == "CoreIcon"){
          return(
            <Marker icon={CoreIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}></Marker>
          )
        } else if(key[0].type == "heroChallengeIcon"){
          return(
            <Marker icon={heroChallengeIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}></Marker>
          )
        } else if(key[0].type == "pointInterestIcon"){
          return(
            <Marker icon={pointInterestIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}></Marker>
          )
        } else if(key[0].type == "vistaIcon"){
          return(
            <Marker icon={vistaIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}></Marker>
          )
        } else if (key[0].type == "wayPointIcon"){
          return(
            <Marker icon={wayPointIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}></Marker>
          )
        }
      
      })  
  
    )
  }

 

  function ContinentMaker(){

    const map = useMap()

    if(continent.length == 0){
      maps.map((key, index)=> { 
      if(key.type == "Public" && key.show != false)
        continent.push({"name" : key.name, "coord":key.continent_rect})
      })
    }

    return(
      continent.map((key, index)=> { 

        const coord = [
          [map.unproject(key.coord[0],map.getMaxZoom())],
          [map.unproject(key.coord[1],map.getMaxZoom())]
        ]
        const bounds=[
          [coord[0][0].lat, coord[0][0].lng],
          [coord[1][0].lat, coord[1][0].lng]
        ]
        
        return(
          <SVGOverlay key={key.coord[0]+''+key.coord[1]} attributes={{ stroke: 'black' }} bounds={bounds}>
            <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
            <text dominantBaseline="middle" textAnchor="middle" className="labal_map" x="50%" y="50%" strokeWidth={"0px"}>
                {key.name}
              </text>
          </SVGOverlay>
        )
      })
    ) 

  }


  function test(){
    if(fullScreen){
      setFullScreen(false)
    } else {
      setFullScreen(true)
    }
  }
    useEffect(() => {
    
    },[fullScreen])

    return(
      <section className={fullScreen ? 'noMargin interactiveMap' : 'marginLeft interactiveMap'} style={{position: fullScreen ? 'fixed' : 'relative', zIndex: fullScreen ? '999' : '1'}}>
          <MapContainer crs={CRS.Simple} center={[-250,350 ]}  minZoom={3} maxZoom={7} zoom={3} scrollWheelZoom={true} >
            <div onClick={()=>test()} className='fullScreen leaflet-control'><FullscreenIcon /></div>
            <TileLayer
              noWrap={true}
              url="https://adrien-gonzalez.students-laplateforme.io/tiles/1/1/{z}/{x}/{y}.jpg"
            />
            <LocationMarker />
            <ContinentMaker/> 

          </MapContainer>
      </section>
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

