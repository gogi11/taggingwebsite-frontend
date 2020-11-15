import {ApiManager} from "./ApiManager.js";
import {setToken, logOut as loggingOut} from "./TokenManager.js";
const backendUrl = process.env.VUE_APP_BACKEND_URL;

export function login(username, password) {
    console.log(backendUrl+"api-auth/login/");
    return ApiManager.post(backendUrl+"api-auth/login/", {username: username, password: password}).then((res) =>
    {
        setToken(res.data.key);
    })
}
export function logOut() {
    return ApiManager.post(backendUrl+"api-auth/login/", {}).then(() => loggingOut())
}


export function register(username, password) {
    return ApiManager.post(backendUrl+"api/users/", {username: username, password: password}).then((res) =>
    {
        console.log(res.data);
        return login(username, password);
    })
}