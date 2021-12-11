import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/firebase/firebaseDb.js";
import { collection, getDocs , addDoc,doc,getDoc,updateDoc, deleteDoc  } from "firebase/firestore";

Vue.use(Vuex);

const totalCupos = (cursos) =>
(cursos.reduce((acc, act) => acc + parseInt(act.cupos),0 ));
const totalInscritos = (cursos) =>
 (cursos.reduce((acc, act) => acc + act.inscritos, 0));

export default new Vuex.Store({
  state: {
    cursos:[],
    email:'',


  },
  getters: {
 
    getCursos: ({ cursos }) => {
      return cursos;
    },
    getTotalCupos: ({ cursos }) => {
      return totalCupos(cursos)

    },
    getTotalInscritos:(state)=> {
      return state.cursos.reduce(function(total, curso){
        return total + parseInt(curso.inscritos)
      },0)
    },
    getTotalCuposRestantes: ({ cursos }) => {
      return parseInt(totalCupos) -parseInt(totalInscritos)
    },
    getTotalCursosTerminados: ({ cursos }) => {
      return cursos.filter((curso) => !curso.estado).length
    },
    getTotalCursosActivos: ({ cursos }) => {
      return cursos.filter((curso) => curso.estado).length
    },
    getTotalCursos: ({ cursos }) => {
      return cursos.length
    },
  },
  mutations: {
    SET_EMAIL(state, email){
      state.email = email
    },
    RESET_EMAIL(state){
      state.email = ''
    },
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
    },
     //OBTENER  SÓLO UN CURSO)
    fetchIdCurso({},id_curso){
      const docRef = doc(db, "cursos", id_curso);
      return getDoc(docRef);
      
    },
    //UPDATE
    updateCurso({},curso){
      const Curso_Update = doc(db, "cursos", curso.id);
      // Envio el curso completo para editar 
      return updateDoc(Curso_Update, {
        curso
      });
    },
    //DELETE
    deleteCurso({},id_curso){
      return deleteDoc(doc(db, "cursos", id_curso));
    },


    setMail({commit}, email){
      commit('SET_EMAIL', email)
    },
    resetEmail({commit}){
      commit('RESET_EMAIL')
    },
  },
  
  modules: {},
});
