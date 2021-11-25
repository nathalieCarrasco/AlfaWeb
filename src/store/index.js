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
  getters: {
    getCursos: ({ cursos }) => {
      return cursos;
    },
  },
  mutations: {
    ADD_CURSO(state,curso){

      state.cursos.push({

        id:curso.id,
        codigo:curso.data().codigo,
        costo:curso.data().costo,
        cupos:curso.data().cupos,
        descripcion:curso.data().descripcion,
        duracion:curso.data().duracion,
        estado:curso.data().estado,
        fecha:curso.data().fecha,
        inscritos:curso.data().inscritos,
        nombre:curso.data().nombre,
        url:curso.data().url
      
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
