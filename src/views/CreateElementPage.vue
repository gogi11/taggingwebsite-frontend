<template>
  <div>
      <h2>Creating an entry</h2><br>
      <EditElementForm ref="form"/>
  </div>
</template>

<script>
import EditElementForm from '../components/EditElementForm.vue'
import {getAllTags} from '../common/SearchManager.js'
import {createElement} from '../common/ElementManager.js'

export default {
  name: 'LoginPage',
  components: {EditElementForm},
  props: { },
  data() {
    return {
      form: undefined
    } 
  },
  mounted(){
    this.form = this.$refs.form;
    getAllTags().then((res)=>{
        this.form.options = res.data.results;
        this.form.originalTags = JSON.parse(JSON.stringify(this.form.tags));
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
    onSubmit(){
      createElement(this.form.title, this.form.description, this.form.tags).then(()=>{
        this.$toasted.show("You created the element successfully.");
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
