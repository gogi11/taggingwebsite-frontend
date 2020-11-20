<template>
    <div>
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
import Multiselect from 'vue-multiselect';

export default {
  name: 'EditElementForm',
  components: {Multiselect},
  data() {
    return {
      title: undefined,
      description: undefined,
      tags: [],
      options: [],
    } 
  },
  methods: {
    submit(e){
      e.preventDefault();
      this.$emit("finishedEditing")
    },
    searchChanged(query){
      let newOption = {"name": query};
      let lastOption = this.options[this.options.length-1];
      if(!lastOption){
        this.options.push(newOption)
      }else if (query!=""){
        this.options[this.options.length-1] = newOption;
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
