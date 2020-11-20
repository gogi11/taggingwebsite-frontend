<template>
    <div id="nav">
        <router-link class="button" :to='{name:"Home"}'><div>Home</div></router-link>
        <template v-if="!isAuth">
            <router-link class="button" :to='{name:"Login"}'><div>Login</div></router-link>
        </template>
        <template v-else>
            <router-link class="button" :to='{name:"Create Element"}'><div>Create Entry</div></router-link>
            <a class="button" href="#" @click="logOutUser()"><div>Log Out</div></a>
        </template>
    </div>
</template>

<script>
import {isAuthenticated} from "../common/TokenManager.js";
import {logOut} from "../common/LoginManager.js";
import EventBus from '../common/event-bus.js';

export default {
    name: 'Navigation',
    data(){
        return{
            isAuth: isAuthenticated()
        }
    },
    mounted(){
        EventBus.$on("authChange", (isAuth) => {
            this.isAuth = isAuth;
        });
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
    z-index: 100;
    top: 0;
    width: 100%;
    text-align: left;
    background: #23463f;
    border-bottom: 2px solid #000;
    .button{
        text-decoration: none;
        font-weight: bold;
        color: #42b983;
        &.router-link-exact-active {
            color: #5ef0dc;
        }
        div{
            border-right: 2px solid black;
            box-sizing: border-box;
            padding: 10px;
            margin: 0;
            height: 100%;
            transition: 0.5s all;
            padding: 20px;
            display: inline-block;
        }
        margin: 0;
        height: 100%;
    }
    .button:hover{
        color: #52df9f;
        div{
            background: #083822;
        }
    }
    a:last-child{
        border-right: none;
    }
}
</style>