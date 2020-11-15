<template>
    <div id="nav">
      <router-link to="/">Login</router-link>
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
</template>

<script>
export default {
    name: 'Navigation'    
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