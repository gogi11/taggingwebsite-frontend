<template>
  <div>
      <h2>Updating an entry</h2><br>
      <EditElementForm ref="form"/>
  </div>
</template>

<script>
import EditElementForm from '../components/EditElementForm.vue'
import {getElement, getAllTags} from '../common/SearchManager.js'
import {updateElement} from '../common/ElementManager.js'

export default {
  name: 'EditElementPage',
  components: {EditElementForm},
  data() {
    return {
      originalTags: [],
      canSubmit: false,
      form: undefined
    } 
  },
  mounted(){
    this.form = this.$refs.form;
    getElement(this.$route.params.id).then((res)=>{
        this.form.title = res.data.title;
        this.form.description = res.data.description;
        this.form.tags = res.data.tags;
        this.originalTags = JSON.parse(JSON.stringify(this.form.tags));
        this.canSubmit = true;
    }).catch(() => {
        this.$toasted.error("Please reload the page");
      }
    )
    getAllTags().then((res)=>{
        this.form.options = res.data.results;
      }).catch((err)=>{
        console.error(err);
        let msg = "";
        for(let key in err.response.data){
          msg += key+": " + err.response.data[key]+"<br><br>";
        }
        this.$toasted.error(msg);
      });
    this.form.$on("finishedEditing", ()=>this.onSubmit());
  },
  methods: {
    tagChanges(){
      let tags = [];
      let originalNames = this.originalTags.map((tag) => tag.name);
      let editedNames = this.form.tags.map((tag) => tag.name);
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
    onSubmit(){
      if(this.canSubmit){
        console.log(this.form.description);
        updateElement(
          this.$route.params.id,
          this.form.title,
          this.form.description,
          this.tagChanges()
        ).then(()=>{
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
    }
  }
}
</script>

<style scoped>
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
</style>
