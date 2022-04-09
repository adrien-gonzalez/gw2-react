import axios from "axios";

export function getAccount() {

    return axios
    .get(process.env.REACT_APP_API_URL+"account?access_token=7B754A69-BA5F-4340-89DB-C03B08843BFE98C7272C-B7B5-419E-837A-F98D9DED12B2")
    .then((response) => response.data)
    .catch((error) => error.response.data.errors);
}



