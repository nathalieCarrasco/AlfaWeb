import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/firebase/firebaseDb.js";
import { collection, getDocs , addDoc } from "firebase/firestore";

Vue.use(Vuex);

const totalCupos = (cursos) =>
  cursos.reduce((acc, act) => acc + act.cupos,0 );
const totalInscritos = (cursos) =>
  cursos.reduce((acc, act) => acc + act.inscritos, 0);

export default new Vuex.Store({
  state: {
    cursos:[],
    email:'',


  },
  getters: {
    getCursos: ({ cursos }) => {
      return cursos;
    },
    getCursos: ({ cursos }) => {
      return cursos;
    },
    getTotalCupos:  (state) => {
      return state.cursos.reduce(function(total,curso){
        return total + parseInt(curso.cupos)
      })
    },
    getTotalInscritos:(state)=> {
      return state.cursos.reduce(function(total, curso){
        return total + parseInt(curso.inscritos)
      },0)
    },
    getTotalCuposRestantes: ({ cursos }) => {
      return totalCupos(cursos) - totalInscritos(cursos)
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
     //OBTENER CURSO POR ID (UNITARIO, SÓLO UN CURSO)
     fetchIdCurso({}, id_curso){
      return db.collection('cursos').doc(id_curso).get(); 
    },
    //UPDATE
    updateCurso({}, curso){
      return db.collection('cursos').doc(curso.id).update(curso);
    },
    //DELETE
    deleteCurso({}, id_curso){
      return db.collection('cursos').doc(id_curso).delete();
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
