<template>
  <div class="home">
    <div class="main-container">
      <div class="search-bar-container">
        <multiselect 
          v-model="selectedTags"
          class="multiselect" 
          label="name"
          track-by="name"
          placeholder="Type to search" 
          open-direction="bottom" 
          :options="options" 
          :multiple="true" 
          :searchable="true" 
          :loading="isLoading"  
          :clear-on-select="true" 
          :close-on-select="false"
          :limit="10"
          :max-height="400"
          @search-change="searchChanged"
          @select="selectedTag"
          @remove="removedTag"
          >
            <template slot="tag" slot-scope="{ option, remove }">
              <span class="custom__tag">
                <span class="custom__remove" @click="remove(option)">{{labelText(option)}}</span>
              </span>
            </template>
            <template slot="clear" slot-scope="props">
              <div class="multiselect__clear" v-if="selectedTags.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
            </template><span slot="noResult">{{noResultsStr}}</span>
        </multiselect>
        <button class="search-button" @click="search">Search</button>
      </div>
      <div class="results">
        <template v-if="elements.length==0">
          <h1>There are no results!</h1>
          Try changing the tags.
        </template>
        <template v-else>
          <h1>Results:</h1>
          <div v-for="(el, index) in elements" :key="index">
            {{el.title}} {{el.description}}  {{el.tags}}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {getAllTags, getAllUsers, getElementsQueried} from '../common/SearchManager.js'

// @ is an alias to /src
export default {
  name: 'Home',
  components: {Multiselect}, 
  data () {
      return {
        selectedTags: [],
        isLoading: false,
        options: [],
        allTags: [],
        allUsers: [],
        title: undefined,
        titleSelected: false,
        noResultsStr: "Tags are still loading. If they take too much time, refresh the page.",
        elements: [],
      }
    },
    mounted(){
      getAllTags().then((res)=>{
        this.allTags = res.data;
        this.allTags.forEach(tag => {
          tag.type = "tag"
        });
        this.options = JSON.parse(JSON.stringify(this.allTags));
        return getAllUsers().then((response) => {
          this.allUsers = response.data;
          for(let user of this.allUsers){
            this.options.push({"name": user.username, "type": "user", "id": user.id})
          }
          this.noResultsStr = "Oops! No such tag found. Consider changing the search query.";
        }) 
      }).catch((err)=>{
        console.error(err);
        let msg = "";
        for(let key in err.response.data){
          msg += key+": " + err.response.data[key]+"<br><br>";
        }
        this.$toasted.error(msg);
      });
    },
    methods:{
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      labelText(option){
        return this.capitalizeFirstLetter(option.type)+": "+option.name;
      },
      search(){
        let tags = this.selectedTags.filter((tag) => tag.type="tag");
        let user = this.selectedTags.find((tag) => tag.type="user");
        let title = this.selectedTags.find((tag) => tag.type="title");
        getElementsQueried(tags, user, title).then((res) => {
          this.elements = res.data;
        }).catch((err)=>{  
          let msg = "";
          for(let key in err.response.data){
            msg += key+": " + err.response.data[key]+"<br><br>";
          }
          this.$toasted.error(msg);
        });
      },
      selectedTag(tag){
        if(tag.type == "title"){
          this.titleSelected = true;
          tag.name = tag.name.replace("Title: ","");
          this.options.filter((el) => el.type!="title");
        }
      },
      removedTag(tag){
        if(tag.type == "title"){
          this.titleSelected = false;
        }
      },
      searchChanged(query){
        if(!this.titleSelected){
          this.title = query;
          let newOption = {"name": "Title: " + this.title, "type": "title"};
          let lastOption = this.options[this.options.length-1] ?? {"name": ""};
          if(lastOption.type == "title"){
            if(query!=""){
              this.options[this.options.length-1] = newOption;
            }else{
              this.options.pop();
            }
          }else if (query!=""){
            newOption.type = "title";
            this.options.push(newOption)
          }
        }
      }
    }

}
</script>
<style lang="scss" scoped>
  .main-container{
    width: 80%;
    margin-left: 10%;
    min-height: 80%;
    margin-top: 30px;
    position: absolute;
    border-radius: 20px;
    background: #23463f;
    color: white;
  }
  .search-bar-container{
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .custom__remove{
    background: #40e4c3;
    color: #fff;
    padding: 3px;
    margin-right: 3px;
    border-radius: 3px;
    cursor: pointer;
  }
  .multiselect{
    width: 80%!important;
    display: inline-block;
    vertical-align: top;
  }
  .search-button{
    width:20%;
    min-height: 40px;
    margin:0;
    border-top-right-radius: 20px;
    background: #40e4c3;
    color: #23463f;
    transition: all 0.3s;
    cursor: pointer;
  }
  .search-button:focus{
    outline: none;
  }
  .search-button:hover{
    color: #fff;
    background: #21816e;
  }
</style>