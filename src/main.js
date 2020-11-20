import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Toasted from 'vue-toasted';
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


Vue.use(VueQuillEditor,{
      theme: 'snow',
      boundary: document.body,
      modules: {
        toolbar: {
          container: [
            'bold', 'italic', 'underline', 'strike',
            'blockquote', 'code-block',
            { 'list': 'ordered' }, { 'list': 'bullet' },
            { 'size': [] },
            { 'color': [] }, { 'background': [] },
            { 'align': [] },
            'link', 'image', 'video',
            'youtube'
          ],
          handlers: {
            'youtube': function() {
              let urlTxt = prompt("Enter your YouTube URL: ");
              if(urlTxt.indexOf("embed") == -1){
                let url = new URL(urlTxt);
                let videoId = url.searchParams.get("v");
                urlTxt = "https://www.youtube.com/embed/"+videoId; 
              }
              const value = "<iframe src='"+urlTxt+"' frameborder='0'></iframe>";
              this.quill.container.firstChild.innerHTML += value;
            }
          }
        }
      },
      placeholder: 'Insert text here ...',
      readOnly: false
  }
)
 
Vue.use(VueRouter)
Vue.use(Toasted, { 
  theme: "bubble", 
  position: "bottom-center", 
  duration : 5000
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
