<template>
  <div>
      <h2>Welcome</h2><br>
      <div class="login">    
        <div class="border-start">
          <div class="white-stripe">
            <h3>Login</h3>
          </div>
          <form id="login" method="get" @submit="logInFormSubmitted">
              <label><b>User Name</b><br>
              </label>    
              <input type="text" v-model="userLogin" class="classy-input" id="Uname" placeholder="Username">    
              <br><br>    
              <label><b>Password</b><br>  
              </label>    
              <input type="Password" v-model="passLogin" class="classy-input" id="Pass" placeholder="Password">    
              <br><br>    
              <input type="submit" id="log" value="Log In">       
              <br><br>
          </form>
        </div>
        <div class="border-end">
          <div class="white-stripe">
            <h3>Register</h3>
          </div>
          <form id="register" method="get" @submit="registerFormSubmitted">
              <label><b>User Name</b><br>    
              </label>    
              <input type="text" v-model="userRegister" class="classy-input" id="UnameReg" placeholder="Username">    
              <br><br>    
              <label><b>Password</b><br>
              </label>    
              <input type="password" v-model="passRegister" class="classy-input" id="PassReg" placeholder="Password">    
              <br><br>    
              <input type="submit" id="reg" value="Register">       
              <br><br>  
          </form>
        </div>
      </div>
      <router-link to="/home" class="browse">
        Or click here to just browse
      </router-link>
  </div>
</template>

<script>
import {login, register} from "../common/LoginManager.js";

export default {
  name: 'LoginPage',
  props: { },
  data() {
    return {
      userLogin: undefined,
      userRegister: undefined,
      passLogin: undefined,
      passRegister: undefined,
    } 
  },
  methods: {
    logInFormSubmitted(e){
      e.preventDefault();
      login(this.userLogin, this.passLogin).then(()=> this.$router.push({name: "Home"}))
      .catch((err) => {
        console.log(err);
        this.$toasted.error(err);
      });
    },
    registerFormSubmitted(e){
      e.preventDefault();
      register(this.userRegister, this.passRegister).then(() => this.$router.push({name: "Home"}))
      .catch((err) => {
        let msg = "";
        for(let key in err.response.data){
          msg += key+": " + err.response.data[key]+"<br><br>";
        }
        this.$toasted.error(msg);
      });
    }
  }
}
</script>

<style scoped>
  .browse{
    text-decoration: none;
    position: relative;
    top: 30px;
    padding: 10px;
    color: #fff;
    background: #23463f;
    border-radius: 10px;
    transition: all 0.3s;
  }
  .browse:hover{
    color: #08ffd1;
  }
  .border-start{
    border-right: 3px solid #000;
    box-sizing:border-box;
  }
  .border-end{
    border-left: 3px solid #000;
    box-sizing:border-box;
  }
  .login{  
    width: 70%;  
    overflow: hidden;  
    margin: auto;  
    margin: 20 0 0 450px;  
    padding: 0;
    background: #23463f;  
    border-radius: 15px;
  }
  .login > div{
    display: inline-block;
    width: 50%;
  }
  form{
    padding-top: 60px; 
    padding-bottom: 60px; 
  }
  h2{  
    text-align: center;
    font-size: 40px;  
    color: #277582;
    -webkit-text-stroke: 1px #fff;
    text-shadow:
        1px 1px 0 #fff,
      -1px -1px 0 #fff,  
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;  
    padding: 20px;  
  }
  h3{
    color: #23463f; 
    font-size: 25px;
    margin: 0;
  }
  label{  
    color: #08ffd1;  
    font-size: 17px;  
  }  
  .classy-input{  
    width: 60%;  
    height: 30px;  
    border: none;  
    border-radius: 3px;  
    padding-left: 8px;  
  }  
  #log, #reg{  
    width: 60%;  
    height: 30px;  
    border: none;  
    border-radius: 17px;  
    padding-left: 7px;
  }
  .white-stripe{
    width: 100%;
    background: white;
    padding-top: 30px;
    padding-bottom: 20px;
  }
</style>
