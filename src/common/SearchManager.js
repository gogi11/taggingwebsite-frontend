import {ApiManager} from "./ApiManager.js";
import { getToken } from "./TokenManager.js";
const backendUrl = process.env.VUE_APP_BACKEND_URL;

export function getAllTags() {
    return ApiManager.get(backendUrl+"api/tags/");
}

export function getAllUsers() {
    return ApiManager.get(backendUrl+"api/users/");
}
export function getCurrentUser() {
    return ApiManager.post(backendUrl+"api/me/", {key: getToken()});
}


export function getElement(id) {
    return ApiManager.get(backendUrl+"api/elements/"+id+"/");
}



export function getElementsQueried(tags, user=undefined, title=undefined, limit=undefined, offset=undefined) {
    let url = new URL(backendUrl+"api/elements/");

    if(tags && tags.length && tags.length>0){
        let tagQueryStr = "";
        for (let tag of tags){
            tagQueryStr += tag.name+",";
        }
        tagQueryStr = tagQueryStr.substr(0, tagQueryStr.length-1)
        url.searchParams.append("tags", tagQueryStr);
    }
    if(user && user.id) url.searchParams.append("user", user.id);
    if(title && title.name!="") url.searchParams.append("search", title.name);
    
    if(offset) url.searchParams.append("offset", offset);
    if(limit) url.searchParams.append("limit", limit);

    return ApiManager.get(url.toString());
}
