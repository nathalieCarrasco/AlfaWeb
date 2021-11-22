<template>
  <v-container>
    <h1 class="tituloCursos my-4">Lista de Cursos</h1>
    
  </v-container>
</template>

<script>
import { mapActions,mapState} from "vuex";
export default {
  name: "home",
  // props: {},
  data: function () {
    return {};
  },
  computed: {
  ...mapState(['cursos'])
  },
  methods: {
    ...mapActions(["fetchCursos"]),
  },
  // watch: {},
  // components: {},
  // -- Lifecycle Methods
  // beforeCreate() {},
   created() {
     this.fetchCursos();
   },
  // beforeMount() {},
  //mounted() {
   // this.fetchCursos();
  //},
  // beforeUpdate() {},
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  // -- End Lifecycle Methods
};
</script>

<style scoped>
.tituloCursos {
  text-align: center;
  font-size: 70px;
  font-weight: 400;
}
.nombreCurso {
  text-align: center;
  font-size: 20px;
}
.cardBody {
  background-color: #eee;
  height: 550px;
}
.colCard {
  display: flex;
  justify-content: center;
}
</style>