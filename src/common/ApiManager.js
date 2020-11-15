const axios = require('axios');
import {getToken} from "./TokenManager.js";

export class ApiManager{
    static setHeaders(headers){
        let token = getToken();
        if(token){
            headers.Authorization = "Bearer "+token
        }
        return headers;
    }
    static get(url, headers={}){
        headers = ApiManager.setHeaders(headers);
        return axios({
            method: 'get',
            url: url,
            headers: headers
        })
    }
    static post(url, data={}, headers={}){
        headers = ApiManager.setHeaders(headers);
        return axios({
            method: 'post',
            url: url,
            data: data,
            headers: headers
        })
    }
    static patch(url, data={}, headers={}){
        headers = ApiManager.setHeaders(headers);
        return axios({
            method: 'patch',
            url: url,
            data: data,
            headers: headers
        })
    }
    static delete(url, headers={}){
        headers = ApiManager.setHeaders(headers);
        return axios({
            method: 'delete',
            url: url,
            headers: headers
        })
    }
}