<template>
  <div id="app">
    <div id="background"></div>
    <LoginPage/>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'

export default {
  name: 'App',
  components: {
    LoginPage
  }
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
