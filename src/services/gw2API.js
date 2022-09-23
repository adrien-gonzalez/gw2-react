import axios from "axios";

export function getAccount(key) {
    return axios
    .get(process.env.REACT_APP_API_URL+"account?access_token="+key)
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);     
}

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

// 7B754A69-BA5F-4340-89DB-C03B08843BFE98C7272C-B7B5-419E-837A-F98D9DED12B2