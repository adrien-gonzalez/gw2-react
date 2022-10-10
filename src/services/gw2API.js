import axios from "axios";

// GET ACCOUNT INFO
export function getAccount(key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"account?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);     
}

// GET CHARACTER INFO
export function getCharacters(key, id = "all") {
    return axios
    .get(process.env.REACT_APP_API_URL+"characters?ids="+id+"&access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);   
}


export function getInfoGuild(guildId, key) {
    if (guildId != null) {
        return axios
        .get(process.env.REACT_APP_API_URL+"guild/"+guildId+"?access_token="+key)
        .then((response) => response.data)
        .catch((error) => error.response.data.errors);    
    } 
}

// GET ITEM BY ID
export function getItem(item_id, key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"items/"+item_id+"?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

export function getSkin(skin_id, key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"skins/"+skin_id+"?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}


// GET ACCOUNT BANK
// account/bank
