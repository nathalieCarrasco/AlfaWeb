<template>
<div>
  <v-container> 
      <h1 class="mb-2 text-center">Administración</h1>
    <v-row>
  <v-data-table
    :headers="headers"
    :items="cursos"
    :items-per-page="5"
    class="elevation-1"
  > </v-data-table>


      <!--info cursos-->
      <v-col>
        <v-alert dense outlined color="purple" icon="mdi-account-group">
          Cantidad total de alumnos permitidos: 
        </v-alert>

        <v-alert dense outlined color="blue" icon="mdi-account-multiple-check">
          Cantidad total de alumnos inscritos: 
        </v-alert>

        <v-alert dense outlined color="pink" icon="mdi-account-clock">
          Cantidad total de cupos restantes:
        </v-alert>

        <v-alert dense outlined color="red" icon="mdi-cancel">
          Cantidad total de cursos terminados: 
        </v-alert>

        <v-alert dense outlined color="teal" icon="mdi-bell-check">
          Cantidad total de cursos activos: 
        </v-alert>

        <v-alert dense outlined color="deep-orange" icon="mdi-bell-ring">
          Cantidad total de cursos: 
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import { mapActions,mapState} from "vuex";


  export default {
    name: "administracion",
    data () {
      return {
        headers: [
          {
            text: 'Curso',
            align: 'start',
            sortable: false,
            value: 'nombre',
          },
          { text: 'Cupos', value: 'cupos' },
          { text: 'Inscritos', value: 'inscritos' },
          { text: 'Duracion', value: 'duracion' },
          { text: 'Costo', value: 'costo'},
          { text: 'Terminado', value: 'estado' },
          { text: 'Fecha', value: 'fecha' },
        ],
      }
    },
    computed: {
  ...mapState(['cursos'])
  },

    methods: {
    ...mapActions(["fetchCursos"]),
    },

  }
</script>