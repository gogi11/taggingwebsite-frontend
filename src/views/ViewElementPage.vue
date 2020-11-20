<template>
  <div>
      <div class="main-container">    
        <ViewElementForm :tags="tags" :user="user" :description="description" :title="title"/>
        <router-link :to="{name: 'Edit Element', params: {id: this.$route.params.id}}">
          <button v-if="canEdit" class="edit-button">Edit Entry</button>
        </router-link>
      </div>
  </div>
</template>

<script>
import {getElement, getCurrentUser} from '../common/SearchManager.js'
import ViewElementForm from '../components/ViewElementForm.vue'

export default {
  name: 'ViewElementPage',
  components: {ViewElementForm},
  props: { },
  data() {
    return {
      title: undefined,
      description: undefined,
      tags: [],
      user: undefined,
      canEdit: false
    } 
  },
  mounted(){
    getElement(this.$route.params.id).then((res)=>{
        this.title = res.data.title;
        this.description = res.data.description.replace("\n", "<br>");
        this.tags = res.data.tags;
        this.user = res.data.user;
        getCurrentUser().then((response)=>{
          if(response.data.id == res.data.user.id){
            this.canEdit = true;
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
  }
}
</script>

<style scoped>
  .edit-button{
    width: 20%;
    height: 30px;
    border: none;
    border-radius: 17px;  
    padding-left: 7px;
    cursor: pointer;
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
</style>
