import {ApiManager} from "./ApiManager.js";
const backendUrl = process.env.VUE_APP_BACKEND_URL;

export function getAllTags() {
    return ApiManager.get(backendUrl+"api/tags/");
}

export function getAllUsers() {
    return ApiManager.get(backendUrl+"api/users/");
}

export function getElementsQueried(tags, user=undefined, title=undefined) {
    let url = new URL(backendUrl+"api/elements/");

    let tagQueryStr = "";
    if(tags && tags.length && tags.length>0){
        tagQueryStr = ""
        for (let tag of tags){
            tagQueryStr += tag.name+",";
        }
        tagQueryStr = tagQueryStr.substr(0, tagQueryStr.length-1)
        url.searchParams.append("tags", tagQueryStr);
    }
    if(user && user.id){
        url.searchParams.append("user", user.id);
    }
    if(title && title!=""){
        url.searchParams.append("title", title);
    }

    return ApiManager.get(url.toString());
}
