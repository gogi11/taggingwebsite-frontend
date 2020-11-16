<template>
  <div>
      <h2>Creating an entry</h2><br>
      <div class="main-container">    
        <form id="register" method="get" @submit="submit">
              <label><b>Title</b><br>    
              </label>    
              <input type="text" v-model="title" class="classy-input" id="UnameReg" placeholder="Title">    
              <br><br>    
              <label><b>Description</b><br>
              </label>    
              <textarea v-model="description" class="classy-text-area" id="PassReg" placeholder="Description"/> 
              <br><br>
              <label><b>Tags</b><br>
              </label>    
              
              <multiselect 
              v-model="tags"
              class="multiselect" 
              label="name"
              track-by="name"
              placeholder="Type to search" 
              open-direction="top" 
              :options="options" 
              :multiple="true" 
              :searchable="true"
              :clear-on-select="true" 
              :close-on-select="false"
              :limit="10"
              :max-height="400"
              @search-change="searchChanged"
              >
                  <template slot="tag" slot-scope="{ option, remove }">
                    <span class="custom__tag">
                      <span class="custom__remove" @click="remove(option)">{{option.name}}</span>
                    </span>
                  </template>
                  <template slot="clear" slot-scope="props">
                    <div class="multiselect__clear" v-if="tags.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
                  </template><span slot="noResult">Oops! No such tag found. Consider changing the search query.</span>
              </multiselect>
              

              <br><br>
              <input type="submit" class="create-entry-button" value="Update Entry">       
              <br><br>  
          </form>
      </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {getElement, getAllTags} from '../common/SearchManager.js'
import {updateElement} from '../common/ElementManager.js'

export default {
  name: 'LoginPage',
  components: {Multiselect},
  data() {
    return {
      title: undefined,
      description: undefined,
      tags: [],
      originalTags: [],
      options: [],
      canSubmit: false,
    } 
  },
  mounted(){
    getElement(this.$route.params.id).then((res)=>{
        this.title = res.data.title;
        this.description = res.data.description;
        this.tags = res.data.tags;
        this.originalTags = JSON.parse(JSON.stringify(this.tags));
        this.canSubmit = true;
    }).catch(() => {
        this.$toasted.error("Please reload the page");
      }
    )
    getAllTags().then((res)=>{
        this.options = res.data;
      }).catch((err)=>{
        console.error(err);
        let msg = "";
        for(let key in err.response.data){
          msg += key+": " + err.response.data[key]+"<br><br>";
        }
        this.$toasted.error(msg);
      });
  },
  methods: {
    tagChanges(){
      let tags = [];
      let originalNames = this.originalTags.map((tag) => tag.name);
      let editedNames = this.tags.map((tag) => tag.name);
      for(let tagName of originalNames){
        tags.push({"name": tagName, "to_delete": true})
      }
      for(let tagName of editedNames){
        let stillExistsIndex = originalNames.indexOf(tagName);
        if(stillExistsIndex > -1){
          tags[stillExistsIndex].to_delete = false;
        }else{
          tags.push({"name": tagName});
        }
      }
      return tags;
    },
    submit(e){
      e.preventDefault();
      if(this.canSubmit){
        updateElement(this.$route.params.id, this.title, this.description, this.tagChanges()).then(()=>{
          this.$toasted.show("You updated the element successfully.");
          this.$router.push({name: "Home"});
        }).catch((err)=>{
          console.error(err);
          let msg = "";
          for(let key in err.response.data){
            msg += key+": " + err.response.data[key]+"<br><br>";
          }
          this.$toasted.error(msg);
        });
      }
    },
    searchChanged(query){
      let newOption = {"name": query};
      let lastOption = this.options[this.options.length-1];
      if(!lastOption){
        this.options.push(newOption)
      }else if (query!=""){
        this.options[this.options.length-1] = newOption;
      }else{
        this.options = [];
      }
    }
  }
}
</script>

<style scoped>
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
    padding-bottom: 0;
    margin-bottom: 0;
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
  .create-entry-button{
    width: 20%;
    height: 30px;
    border: none;
    border-radius: 17px;  
    padding-left: 7px;
    cursor: pointer;
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
    cursor: pointer;
  }
</style>
