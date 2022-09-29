import axios from "axios";

// GET ACCOUNT INFO
export function getAccount(key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"account?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);     
}

// GET CHARACTER INFO
export function getCharacters(key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"characters?ids=all&access_token="+key)
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



// use getCharacters(key) and get equipment / skin / id
// https://api.guildwars2.com/v2/skins/7662