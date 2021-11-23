import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/firebase/firebaseDb.js";
import { collection, getDocs , addDoc } from "firebase/firestore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cursos:[],
    email:'',

  },
  mutations: {
    ADD_CURSO(state,curso){

      state.cursos.push({

        id:curso.id,
        codigo:curso.data().Codigo,
        costo:curso.data().Costo,
        cupos:curso.data().Cupos,
        descripcion:curso.data().Descripcion,
        duracion:curso.data().Duracion,
        estado:curso.data().Estado,
        fecha:curso.data().Fecha,
        inscritos:curso.data().Inscritos,
        nombre:curso.data().Nombre,
        url:curso.data().URL
      
      })
    },
    RESET_CURSOS(state){
      state.cursos=[]
    }
  },
  actions: {
    async  fetchCursos({commit}) {
      const querySnapshot = await getDocs(collection(db, "cursos"));
      commit('RESET_CURSOS')
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        
        commit('ADD_CURSO',doc)
        console.log(doc.id, " => ", doc.data());
      });
    },
    
    addcurso({},curso){
      return  addDoc(collection(db, "cursos"), curso);
    }
  },
  modules: {},
});
