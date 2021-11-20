import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false

const firebaseConfig = {

  apiKey: "AIzaSyALTIZ1DLKFpbUK4u3cCC_LBq_CcKErFFA",
  authDomain: "alfaawebnc.firebaseapp.com",
  projectId: "alfaawebnc",
  storageBucket: "alfaawebnc.appspot.com",
  messagingSenderId: "524124681516",
  appId: "1:524124681516:web:8d9810a0e3788c218de889"

};

initializeApp(firebaseConfig);
const Auth = getAuth();

onAuthStateChanged(Auth,()=>{
  new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
});
