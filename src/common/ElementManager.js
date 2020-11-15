import {ApiManager} from "./ApiManager.js";
const backendUrl = process.env.VUE_APP_BACKEND_URL;

export function createElement(title, description, tags) {
    if(!title || title.length < 3){
        console.log(title);
        return new Promise((resolve, reject) => {
            reject({"response": {"data": {"Title": "You need to type at least 3 charcters."}}});
        });
    }
    if(!tags || tags.length == 0){
        return new Promise((resolve, reject) => {
            reject({"response": {"data": {"Tags": "You need to select at least 1 tag."}}});
        });
    }
    return ApiManager.post(backendUrl+"api/elements/", {title: title, description: description, tags: tags});
}
