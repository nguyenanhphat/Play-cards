import axios from 'axios';
import { API_URL } from './../constants/index';

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}