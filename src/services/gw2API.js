import axios from "axios";

// SCOPE ACCOUNT
export function getAccount(key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"account?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);     
}

// SCOPE CHARACTER
export function getCharacters(key, id = "all") {
    return axios
    .get(process.env.REACT_APP_API_URL+"characters?ids="+id+"&access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);   
}


// export function getInfoGuild(guildId, key) {
//     if (guildId != null) {
//         return axios
//         .get(process.env.REACT_APP_API_URL+"guild/"+guildId+"?access_token="+key)
//         .then((response) => response.data)
//         .catch((error) => error.response.data.errors);    
//     } 
// }

// SCOPE ACCOUNT
export function getItem(item_id) {
    return axios
    .get(process.env.REACT_APP_API_URL+"items/"+item_id)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

// SCOPE ACCOUNT
export function getSkin(skin_id, key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"skins/"+skin_id+"?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

// SCOPE inventories
export function getBankAccount(key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"account/bank?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}


// SCOPE WALLET
export function getWallet(key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"account/wallet?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}


// SCOPE ACCOUNT
export function getCurrencies(key, id) {
    return axios
    .get(process.env.REACT_APP_API_URL+"currencies?ids="+id+"&access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

// INFO PERMISSION
export function getPermissions(key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"tokeninfo?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}


export function getTrading() {
    return axios
    .get(process.env.REACT_APP_API_URL+"commerce/listings?page=1&page_size=200")
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);    
}

// GET TRADING POST
// https://api.guildwars2.com/v2/commerce/listings?page=1&page_size=200

// GET ITEM INFO
// https://api.guildwars2.com/v2/items?id=273