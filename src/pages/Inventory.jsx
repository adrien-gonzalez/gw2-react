import '../App.css';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import {getCharacters, getItem} from '../services/gw2API';
import Spinner from 'react-bootstrap/Spinner';
import { Table, TableBody, TableCell, TableRow, Tooltip, Zoom  } from '@mui/material';

const Inventory = (props) => {

    const [apiKey] = useState(localStorage.getItem('apiKey') ?? null);
    const [load, setLoad] = useState(false);
    const [bags, setBags] = useState();
    const [item, setItem] = useState();
    const item_table = []

    const fetchInventories = async () => {
        try {
            const data = await getCharacters(apiKey);
            await data.map((key, index) => {
                key.bags.map((key2, index2) => {
                    if(key2){
                        key2.inventory.map((key3, index3) => {
                            if(key3 != null){
                                getItem(key3.id).then(item=>
                                {
                                    item_table.push(item)
                                    if(index + 1 === data.length){
                                        setLoad(true) 
                                    }
                                })
                            }

                        })

                    }
                })
            })
            setBags(data)
            setItem(item_table)

        } catch (error) {
            console.log(error)
        }
      };

    useEffect(() => {
        if(apiKey != null){
            fetchInventories()
        }
    },[])



    if(apiKey){
        if(load == true){
            return (
                <section className='bags_section'>
                {bags.map((key, index) => {
                    return (
                        <div className="character_name" key={key.name}> {key.name}
                            <Table className='table_bags'>
                                <TableBody>
                                    <TableRow className="tr_bags">
                                        {/* GET BAG FOR EACH CHARACTER */}
                                        {key.bags.map((key2, index2) => {
                                            if(key2 != null){
                                                // GET ID OF ITEM FOR EACH BAG
                                                return ( 
                                                    key2.inventory.map((key3, index3) => {
                                                        if(key3 != null){
                                                            const item_find = item.find(
                                                                element => element.id == key3.id
                                                            )
                                                            if(item_find){
                                                                return( 
                                                                    <Tooltip TransitionComponent={Zoom} title={item_find.description ?? 'Aucune description'} key={'tooltip_'+index3} >
                                                                        <TableCell style={{backgroundImage: `url(${item_find.icon})`}} key={'tab_'+index3}> 
                                                                            <span key={'img_'+index3} className='count_item'>{key3.count}</span>
                                                                        </TableCell>  
                                                                    </Tooltip>
                                                                ) 
                                                            }
                                                        }
                                                    })
                                                )
                                            }
                                        })}
                                    </TableRow >
                                </TableBody>
                            </Table>
                        </div>
                    )
                })}
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
                    style={{color: localStorage.getItem('color') == "default" ? "black" : "white" }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);