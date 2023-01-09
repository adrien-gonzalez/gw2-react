import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker,useMap ,SVGOverlay ,Popup, Rectangle, useMapEvent} from 'react-leaflet'
import L, {CRS} from 'leaflet';
import Dropdown from 'react-bootstrap/Dropdown';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

// MAP ICON
import core from "../img/icon/core.png";
import heroChallenge from "../img/icon/heroChallenge.png";
import pointInterest from "../img/icon/pointInterest.png";
import waypointImg from "../img/icon/waypoint.png";
import vistaImg from "../img/icon/vista.png";
import navigation from "../img/icon/navigation.svg";
import tyriaNavigation from "../img/icon/tyriaNavigation.png";
import maguumaNavigation from "../img/icon/maguumaNavigation.png";
import desertNavigation from "../img/icon/desertNavigation.png";
import canthaNavigation from "../img/icon/canthaNavigation.png";
import puzzle from "../img/icon/puzzle.png";
import dungeonImg from "../img/icon/dungeon.png";
import FullscreenIcon from '@mui/icons-material/Fullscreen';




// MASTERY POINTS
import desert from "../img/icon/desert.png";
import maguuma from "../img/icon/maguuma.png";
import tyria from "../img/icon/tyria.png";
import tundra from "../img/icon/tundra.png";
import cantha from "../img/icon/cantha.png";

// JSON MAP INFO
import  mapsDetails from '../data/maps.json';
import  mapsAll from '../data/mapsALL.json';



const Map = (props) => {

  const [fullScreen, setFullScreen] = useState(false)

  var tasks = []
  var vista = []

  var points_of_interest = []
  var landmark = []
  var skill_challenges = []
  var continent = []
  var waypoint = []
  var dungeon = []
  var allMarkers = []
  var mastery_points = []
  var jumping_puzzles = []


  function LocationMarker() {

    const map = useMap()

    if(allMarkers.length == 0){
      for(var i = 0; i < Object.keys(mapsAll[1].maps).length; i++){
        var maps = mapsAll[1].maps[Object.keys(mapsAll[1].maps)[i]]
  
        const mapsInfo = mapsDetails.find(
          element => element.id == maps.id
        )

       
          if(Object.keys(maps.tasks).length > 0 && mapsInfo.type == "Public" && mapsInfo.show != false){
            Object.keys(maps.tasks).map((key, index)=> { 
              tasks.push([{'id': mapsInfo.id, 'coord' : map.unproject(maps.tasks[key].coord,map.getMaxZoom()), 'type' : 'CoreIcon', 'name': maps.tasks[key].name}])
            })
          }
          
         
          if(Object.keys(maps.landmark).length > 0 && mapsInfo.type == "Public" && mapsInfo.show != false){
            Object.keys(maps.landmark).map((key, index)=> { 
              landmark.push([{'id': mapsInfo.id, 'coord' : map.unproject(maps.landmark[key].coord,map.getMaxZoom()), 'type' : 'pointInterestIcon', 'name': maps.landmark[key].name}])
            })
          }
  
          if(Object.keys(maps.skill_challenges).length > 0 && mapsInfo.type == "Public" && mapsInfo.show != false){
            Object.keys(maps.skill_challenges).map((key, index)=> { 
              skill_challenges.push([{'id': mapsInfo.id, 'coord' : map.unproject(maps.skill_challenges[key].coord,map.getMaxZoom()), 'type' : 'heroChallengeIcon', 'name': maps.skill_challenges[key].name}])
            })
          }
  
          if(Object.keys(maps.vista).length > 0 && mapsInfo.type == "Public" && mapsInfo.show != false){
            Object.keys(maps.vista).map((key, index)=> { 
              vista.push([{'id': mapsInfo.id, 'coord' : map.unproject(maps.vista[key].coord,map.getMaxZoom()), 'type' : 'vistaIcon', 'name': maps.vista[key].name}])
            })
          }
  
          if(Object.keys(maps.waypoint).length > 0 && mapsInfo.type == "Public" && mapsInfo.show != false){
            Object.keys(maps.waypoint).map((key, index)=> { 
              waypoint.push([{'id': mapsInfo.id, 'coord' : map.unproject(maps.waypoint[key].coord,map.getMaxZoom()), 'type' : 'wayPointIcon', 'name': maps.waypoint[key].name,
              'chat_link': maps.waypoint[key].chat_link}])
            })
          }

          if(Object.keys(maps.points_of_interest).length > 0 && mapsInfo.type == "Public" && mapsInfo.show != false){
            Object.keys(maps.points_of_interest).map((key, index)=> { 
              points_of_interest.push([{'id': mapsInfo.id, 'coord' : map.unproject(maps.points_of_interest[key].coord,map.getMaxZoom()), 'type' : 'dungeon', 'icon': maps.points_of_interest[key].icon,
              "name": maps.points_of_interest[key].name, 'chat_link': maps.points_of_interest[key].chat_link }])
            })
          }

          if(Object.keys(maps.mastery_points).length > 0 && mapsInfo.type == "Public" && mapsInfo.show != false){
            Object.keys(maps.mastery_points).map((key, index)=> { 
              mastery_points.push([{'id': mapsInfo.id, 'coord' : map.unproject(maps.mastery_points[key].coord,map.getMaxZoom()), 'type' : 'mastery_points', 'region': maps.mastery_points[key].region,
              "name": maps.mastery_points[key].name}])
            })
          }

          if(Object.keys(maps.jumping_puzzles).length > 0 && mapsInfo.type == "Public" && mapsInfo.show != false){
            Object.keys(maps.jumping_puzzles).map((key, index)=> { 
              jumping_puzzles.push([{'id': mapsInfo.id, 'coord' : map.unproject(maps.jumping_puzzles[key].coord,map.getMaxZoom()), 'type' : 'JumpingIcon', 'name': maps.jumping_puzzles[key].name}])
            })
          }
        }
  
        allMarkers = skill_challenges.concat(landmark, points_of_interest, tasks, waypoint, dungeon, vista, mastery_points, jumping_puzzles)
    }

    return(
      allMarkers.map((key, index)=> { 
        if(key[0].type == "CoreIcon"){

          var CoreIcon = L.icon({
            iconUrl: core,
            iconSize:     [22, 18], 
            className: "hideElement map_"+key[0].id
          });

          return(
            <Marker icon={CoreIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}>
              <Popup>
                  {key[0].name ?? ''}
              </Popup>
            </Marker>
          )
        } else if(key[0].type == "heroChallengeIcon"){

          var heroChallengeIcon = L.icon({
            iconUrl: heroChallenge,
            iconSize:     [22, 22],
            className: "hideElement map_"+key[0].id
          });

          return(
            <Marker icon={heroChallengeIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}>
              <Popup>
                {key[0].name ?? ''}
              </Popup>
            </Marker>
          )
        } else if(key[0].type == "pointInterestIcon"){

    
          var pointInterestIcon = L.icon({
            iconUrl: pointInterest,
            iconSize:     [10, 10], 
            className: "hideElement map_"+key[0].id
          });

          return(
            <Marker icon={pointInterestIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}>
              <Popup>
                {key[0].name ?? ''}
              </Popup>
            </Marker>
          )
        } else if(key[0].type == "vistaIcon"){

          var vistaIcon = L.icon({
            iconUrl: vistaImg,
            iconSize:     [24, 24], 
            className: "hideElement map_"+key[0].id 
          });

          return(
            <Marker icon={vistaIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}>
              <Popup>
                {key[0].name ?? ''}
              </Popup>
            </Marker>
          )
        } else if (key[0].type == "wayPointIcon"){

          var wayPointIcon = L.icon({
            iconUrl: waypointImg,
            iconSize:     [24, 24], 
            className: "hideElement map_"+key[0].id,
          });

          return(
            <Marker icon={wayPointIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}>
              <Popup>
                {key[0].name ?? ''}
                <br />
                {key[0].chat_link ?? ''}
              </Popup>
            </Marker>
          )
        } else if (key[0].type == "dungeon") {
        
          var dungeonIcon = L.icon({
            iconUrl: key[0].icon,
            iconSize:     [23, 26], 
            className: "showElement",
          });

          return(
            <Marker icon={dungeonIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}>
              <Popup>
                {key[0].name ?? ''}
                <br />
                {key[0].chat_link ?? ''}
              </Popup>
            </Marker>
          )
        } else if (key[0].type == "JumpingIcon"){

          var puzzleIcon = L.icon({
            iconUrl: puzzle,
            iconSize:     [16, 16], 
            className: "showElement",
          });

          return(
            <Marker icon={puzzleIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}>
              <Popup>
                {key[0].name ?? ''}
              </Popup>
            </Marker>
          )
        } else {
          
          var masteryPoint = {'Cantha': cantha, 'Maguuma': maguuma, 'Desert': desert, 'Tyria': tyria, 'Tundra': tundra}
          
          var masteryIcon = L.icon({
            iconUrl: masteryPoint[key[0].region],
            iconSize:     [32, 32], 
            className: "hideElement map_"+key[0].id,
          });

          return(
            <Marker icon={masteryIcon} key={index} position={[key[0].coord.lat,key[0].coord.lng]}>
              <Popup>
                {key[0].name  ?? ''}
              </Popup>
            </Marker>
          )
        }
      
      })  
    ) 
  }


  function ContinentMaker(){

    const map = useMap()

    if(continent.length == 0){
      mapsDetails.map((key, index)=> { 
      if(key.type == "Public" && key.show != false)
      // console.log(key)
        continent.push({"id": key.id, "name" : key.name, "coord":key.continent_rect})
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
          <SVGOverlay  key={key.coord[0]+''+key.coord[1]} attributes={{ stroke: 'black' }} bounds={bounds}>
            <Rectangle 
              eventHandlers={{
                mouseover: () => {
                  var ele = document.querySelectorAll('.leaflet-marker-icon')
                  ele.forEach(element => element.classList.add("hideElement"));

                  var ele2 = document.querySelectorAll('.map_'+key.id)
                  ele2.forEach(element => element.classList.remove("hideElement"));
                },
              
              }}
              className="map" 
              bounds={bounds} 
            
            />
            <text dominantBaseline="middle" textAnchor="middle" className="labal_map" x="50%" y="50%" strokeWidth={"0px"}>
                {key.name}
            </text> 
          </SVGOverlay>
        )
      })
    ) 

  }


  function changeFullScreen(){
    if(fullScreen){
      setFullScreen(false)
    } else {
      setFullScreen(true)
    }
  }

  
  function SetView(){
    const map = useMap()
    map.doubleClickZoom.disable(); 

    const onClick = (direction) => {
      if(window.innerWidth > 680){
        const navig = {'N': [-250,350 ], 'E': [-350,450 ], 'S': [-800,220 ], 'W': [-250,230 ]}
        map.setView(navig[direction], 3, {
          "animate": true,
          "pan": {
            "duration": 1
          }
        })
      } else {
        const navig = {'N': [-250,350 ], 'E': [-360,460 ], 'S': [-800,190 ], 'W': [-250,280 ]}
        map.setView(navig[direction], 3, {
          "animate": true,
          "pan": {
            "duration": 1
          }
        })
      }
      
     
    }
  
    return(
      <div className='changeViewButton leaflet-control'>
        <img className="tyriaArrow" onClick={()=>onClick('N')}src={tyriaNavigation}/>
        <img onClick={()=>onClick('E')} className="desertArrow" src={desertNavigation}/>
        <img onClick={()=>onClick('S')} className="canthaArrow" src={canthaNavigation}/>
        <img onClick={()=>onClick('W')} className="maguumaArrow" src={maguumaNavigation}/>  
        <img className="mapNavigation" src={navigation}/>
      </div>
    )
  }


    useEffect(() => {
     
    },[fullScreen])


    function DropdownMenu(){
      return (
        <Dropdown autoClose="inside" className='leaflet-control mapInfo'>
          <Dropdown.Toggle id="dropdown-basic">
            <TipsAndUpdatesOutlinedIcon className="iconDetailMap"></TipsAndUpdatesOutlinedIcon>
          </Dropdown.Toggle>
          <Dropdown.Menu >
            <Dropdown.Item disabled={true}><img src={core}></img><span>Coeur de renomée</span></Dropdown.Item>
            <Dropdown.Item disabled={true}><img src={heroChallenge}></img><span>Points de compétence</span></Dropdown.Item>
            <Dropdown.Item disabled={true}><img src={pointInterest}></img><span>Sites remarquables</span></Dropdown.Item>
            <Dropdown.Item disabled={true}><img src={waypointImg}></img><span>Points de passage</span></Dropdown.Item>
            <Dropdown.Item disabled={true}><img src={vistaImg}></img><span>Panoramas</span></Dropdown.Item>
            <Dropdown.Item disabled={true}><img src={puzzle}></img><span>Puzzle de saut</span></Dropdown.Item>
            <Dropdown.Item disabled={true}><img src={dungeonImg}></img><span>Donjons</span></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    

    return(
      <section className={fullScreen ? 'noMargin interactiveMap' : 'marginLeft interactiveMap'} style={{position: fullScreen ? 'fixed' : 'relative', zIndex: fullScreen ? '999' : '1'}}>

          <MapContainer id="interactiveMapContainer" crs={CRS.Simple} center={[-250,350 ]}  minZoom={3} maxZoom={7} zoom={3} doubleClickZoom={false} scrollWheelZoom={true}>
            <div onClick={()=>changeFullScreen()} className='fullScreen leaflet-control'><FullscreenIcon /></div>
            <DropdownMenu/>
            

            <SetView/>

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

