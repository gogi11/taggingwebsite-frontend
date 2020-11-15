import {ApiManager} from "./ApiManager.js";
import {setToken, removeToken} from "./TokenManager.js";
const backendUrl = process.env.VUE_APP_BACKEND_URL;

export function login(username, password) {
    return ApiManager.post(backendUrl+"api-auth/login/", {username: username, password: password}).then((res) =>
    {
        setToken(res.data.key);
    })
}
export function logOut() {
    return ApiManager.post(backendUrl+"api-auth/logout/", {}).then(() => removeToken())
}


export function register(username, password) {
    return ApiManager.post(backendUrl+"api/users/", {username: username, password: password}).then((res) =>
    {
        console.log(res.data);
        return login(username, password);
    })
}