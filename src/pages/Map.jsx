import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker,useMap, useMapEvents} from 'react-leaflet'
import {CRS} from 'leaflet';

import points from '../data/marker.json';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';



const Map = (props) => {

  const size = [81920, 114688]
  var position= []

  function LocationMarker() {

    const map =useMap()
     
    for(var i = 0; i < Object.keys(points.regions).length; i++){
      var maps = points.regions[Object.keys(points.regions)[i]].maps
      
      for(var j = 0; j < Object.keys(maps).length; j++){
        
        if(maps[Object.keys(maps)[j]].tasks.length > 0){
          maps[Object.keys(maps)[j]].tasks.map((key, index)=> { 
            position.push(map.unproject(key.coord,map.getMaxZoom()))
          })
        }
      }
    }
    

    position.map((key, index)=> { 
      return(
        <Marker position={[key.lat,key.lng]}></Marker>
      )
    })
  }

    useEffect(() => {
     

    },[])



    return(
      <MapContainer crs={CRS.Simple} center={[-250,350 ]}  minZoom={2} maxZoom={7} zoom={3} scrollWheelZoom={true} >
      
        <TileLayer
          noWrap={true}
          url="https://adrien-gonzalez.students-laplateforme.io/tiles/1/1/{z}/{x}/{y}.jpg"
        />
        <LocationMarker />

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

