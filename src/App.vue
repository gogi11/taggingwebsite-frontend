<template>
  <div id="app">
    <NavBar/>
    <div id="background"></div>
    <router-view/>
  </div>
</template>


<script>
import NavBar from "@/components/Navigation.vue"

export default {
  name: 'App',
  components: {NavBar}
}
</script>

<style lang="scss">
@import url("bg1.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body  
{  
  margin: 0;  
  padding: 0;  
}

</style>
