import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker,useMap, useMapEvents,SVGOverlay} from 'react-leaflet'
import L, {CRS, rectangle} from 'leaflet';

import points from '../data/marker.json';
import { CastForEducation, LocalConvenienceStoreOutlined } from '@mui/icons-material';
import core from "../img/icon/core.png";

import heroChallenge from "../img/icon/heroChallenge.png";
import pointInterest from "../img/icon/pointInterest.png";
import teleport from "../img/icon/teleport.png";
import vista from "../img/icon/vista.png";


import  maps from '../data/maps.json';
import {getMap} from '../services/gw2API';





const Map = (props) => {

  const size = [81920, 114688]
  var tasks = []
  var points_of_interest = []
  var sectors = []
  var skill_challenges = []

  var continent = []



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

  var teleportIcon = L.icon({
    iconUrl: teleport,
    iconSize:     [24, 24], 
    className: "teleport" 
  });

  var vistaIcon = L.icon({
    iconUrl: vista,
    iconSize:     [24, 24], 
    className: "vista" 
  });


  function LocationMarker() {

    const map = useMap()
    
     
    for(var i = 0; i < Object.keys(points.regions).length; i++){
      var maps = points.regions[Object.keys(points.regions)[i]].maps
      
      for(var j = 0; j < Object.keys(maps).length; j++){

        if(maps[Object.keys(maps)[j]].tasks.length > 0){
          maps[Object.keys(maps)[j]].tasks.map((key, index)=> { 
            tasks.push([{'coord' : map.unproject(key.coord,map.getMaxZoom()), 'type' : 'CoreIcon'}])
          })
        }

        if(maps[Object.keys(maps)[j]].points_of_interest.length > 0){
          maps[Object.keys(maps)[j]].points_of_interest.map((key, index)=> { 
            points_of_interest.push([{'coord' : map.unproject(key.coord,map.getMaxZoom()), 'type' : 'pointInterestIcon'}])
          })
        }

        if(maps[Object.keys(maps)[j]].sectors.length > 0){
          maps[Object.keys(maps)[j]].sectors.map((key, index)=> { 
            sectors.push([{'coord' : map.unproject(key.coord,map.getMaxZoom()), 'type' : 'vistaIcon'}])
          })
        }

        if(maps[Object.keys(maps)[j]].skill_challenges.length > 0){
          maps[Object.keys(maps)[j]].skill_challenges.map((key, index)=> { 
            skill_challenges.push([{'coord' : map.unproject(key.coord,map.getMaxZoom()), 'type' : 'heroChallengeIcon'}])
          })
        }
      }
    }
    

    var allMarkers = skill_challenges.concat(sectors, points_of_interest, tasks)
  
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
        }
      
      })  
          
    )
  }


  function ContinentMaker(){
    const map = useMap()


  
    maps.map((key, index)=> { 

      if(key.type == "Public")
      continent.push(key.continent_rect)
    })


    // for(var i = 0; i < Object.keys(maps).length; i++){
    //   var maps = maps[Object.keys(points.regions)[i]].maps
      
      
    //   for(var j = 0; j < Object.keys(maps).length; j++){
    //     continent.push(maps[Object.keys(maps)[j]].continent_rect)

    //   }

    // }

    return(
      continent.map((key, index)=> { 
        const coord = [
          [map.unproject(key[0],map.getMaxZoom())],
          [map.unproject(key[1],map.getMaxZoom())]
        ]
        const bounds=[
          [coord[0][0].lat, coord[0][0].lng],
          [coord[1][0].lat, coord[1][0].lng]
        ]
        
        

        return(
          <SVGOverlay attributes={{ stroke: 'black' }} bounds={bounds}>
            <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
    
          </SVGOverlay>
        )
      })
    )
    

    
  }




    useEffect(() => {
      console.log(maps)
    },[])



    return(
      <MapContainer crs={CRS.Simple} center={[-250,350 ]}  minZoom={2} maxZoom={7} zoom={3} scrollWheelZoom={true} >
      
        <TileLayer
          noWrap={true}
          url="https://adrien-gonzalez.students-laplateforme.io/tiles/1/1/{z}/{x}/{y}.jpg"
        />
        {/* <LocationMarker /> */}
       <ContinentMaker/> 
        {/* {test()} */}
      </MapContainer>
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

