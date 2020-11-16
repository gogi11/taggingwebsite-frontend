<template>
  <div>
      <div class="main-container">    
        <form id="register" method="get">
              <label><b>Title</b><br></label>
              <h1>{{title}}</h1>  
              <br><br>    
              <label><b>Description</b><br></label>
              <p id="description" v-html="description">
              </p>
              <br><br>
              <label><b>Tags</b><br></label>    
              <div class="element-tags">
                <span v-for="(tag, index) in tags" :key="index" class="custom__tag">
                  <span class="custom__remove">{{tag.name}}</span>
                </span>  
              </div>
          </form>
          <button v-if="canEdit" class="edit-button" @click="editElement">Edit Entry</button>
      </div>
  </div>
</template>

<script>
import {getElement, getCurrentUser} from '../common/SearchManager.js'

export default {
  name: 'LoginPage',
  components: {},
  props: { },
  data() {
    return {
      title: undefined,
      description: undefined,
      tags: [],
      canEdit: false
    } 
  },
  mounted(){
    getElement(this.$route.params.id).then((res)=>{
        this.title = res.data.title;
        this.description = res.data.description.replace("\n", "<br>");
        this.tags = res.data.tags;
        getCurrentUser().then((response)=>{
          if(response.data.id == res.data.user){
            this.canEdit = true;
            console.log(response.data.id)
            console.log(res.data.user)
          }
        });
      }).catch((err)=>{
        console.error(err);
        let msg = "";
        for(let key in err.response.data){
          msg += key+": " + err.response.data[key]+"<br><br>";
        }
        msg += "Please refresh later."
        this.$toasted.error(msg);
      });
  },
  methods: {
    editElement(){
      this.$router.push({name: 'Edit Element', params: {id: this.$route.params.id}});
    }
  }
}
</script>

<style scoped>
  #description{
    width:80%;
    margin-left: 10%;
  }
  .element-tags{
    margin-top: 20px;
  }
  .main-container{
    width: 70%;
    overflow: hidden;
    margin: auto;
    padding: 0;
    background: #23463f;
    border-radius: 15px;
    color: #fff;
    padding: 30px;
    margin-bottom: 100px;
  }
  .classy-input{
    width: 30%;
    height: 30px;
    border: none;
    border-radius: 3px;
    padding-left: 8px;
    margin-top: 10px;
  }
  .classy-text-area{  
    width: 60%;  
    height: 200px;  
    border: none;
    border-radius: 3px;  
    padding-left: 8px;  
    margin-top: 10px;
  }
  .edit-button{
    width: 20%;
    height: 30px;
    border: none;
    border-radius: 17px;  
    padding-left: 7px;
    cursor: pointer;
    margin-top: 20px;
  }
  .multiselect{
    width: 60%!important;
    margin: auto;
    margin-top: 10px;
  }
  .custom__remove{
    background: #40e4c3;
    color: #fff;
    padding: 3px;
    margin-right: 3px;
    border-radius: 3px;
  }
</style>
