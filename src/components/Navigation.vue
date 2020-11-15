<template>
    <div id="nav">
        <router-link :to='{name:"Home"}'>Home</router-link>
        <template v-if="!isAuthenticated()">
            <router-link :to='{name:"Login"}'>Login</router-link>
        </template>
        <template v-else>
            <a href="#" @click="logOutUser()">Log Out</a>
        </template>
    </div>
</template>

<script>
import {isAuthenticated} from "../common/TokenManager.js";
import {logOut} from "../common/LoginManager.js";

export default {
    name: 'Navigation',
    data(){
        return{

        }
    },
    methods:{
        logOutUser(){
            logOut().then(()=>{
                this.$router.push({"name": "Login"});
            }).catch((err)=>{  
                let msg = "";
                for(let key in err.response.data){
                    msg += key+": " + err.response.data[key]+"<br><br>";
                }
                this.$toasted.error(msg);
            });
        },
        isAuthenticated(){
            return isAuthenticated();
        }
    }
}
</script>

<style lang="scss" scoped> 
#nav {
    position: fixed;
    top: 0;
    width: 100%;
    text-align: left;
    padding: 20px;
    background: #23463f;
    a {
        text-decoration: none;
        font-weight: bold;
        color: #42b983;
        &.router-link-exact-active {
            color: #5ef0dc;
        }
        border-right: 2px solid black;
        box-sizing: border-box;
        padding: 10px;
        margin: 0;
        height: 100%;
    }
    a:last-child{
        border-right: none;
    }
}
</style>