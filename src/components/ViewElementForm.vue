<template>
    <form id="register" method="get">
        <label><b>Title</b><br></label>
        <h1>{{title}}</h1>  
        <br><br>    
        <label><b>Description</b><br></label>
        <quill-editor
            class="quill"
            ref="quill"
            :content="description"
            :options="options"
        />
        <br><br>
        <label><b>Tags</b><br></label>    
        <div class="element-tags">
        <span v-for="(tag, index) in tags" :key="index" class="custom__tag">
            <span class="custom__remove">{{tag.name}}</span>
        </span>  
        </div>
    </form>
</template>
<script>
export default {
    name:'ViewElementForm',
    props:[
        'title',
        'description',
        'tags',
        'user'
    ],
    data(){
        return{
            options:{
                theme: 'snow',
                boundary: document.body,
                modules: {
                    toolbar: false
                },
                placeholder: 'Insert text here ...',
                readOnly: true
            },
        }
    },
    mounted(){
        this.$refs.quill.quill.enable(false);
    }
}
</script>
<style>
    .ql-editor{
        border: none!important;
    }
    .ql-container{
        border: none!important;
        height: 100%!important;
    }
</style>
<style lang="scss" scoped>

  #description{
    width:80%;
    margin-left: 10%;
  }
  .element-tags{
    margin-top: 20px;
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
  .quill{
    color: #000;
    background: #fffc;
    height: 250px;
    width: 80%;
    margin: auto;
  }
</style>