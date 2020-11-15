import EventBus from './event-bus';

export function getToken(){
    return window.localStorage.getItem("token");
}
export function setToken(token){
    window.localStorage.setItem("token", token);
    EventBus.$emit("authChange", true);
}
export function removeToken(){
    window.localStorage.removeItem("token");
    EventBus.$emit("authChange", false);
}
export function isAuthenticated(){
    return Boolean(window.localStorage.getItem("token"));
}