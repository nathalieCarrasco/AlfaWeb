<template>
  <div>
    <v-container>
      <h1>Editando el Curso : {{ editItem.nombre }}</h1>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="editItem.nombre" label="Nombre"></v-text-field>

          <v-text-field
            v-model="editItem.url"
            label="Url de la Imagen del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.cupos"
            label="Cupos del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.inscritos"
            label="Inscritos en el curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.duracion"
            label="Duración del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.costo"
            label="Costo del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.codigo"
            label="Código del curso"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            outlined
            v-model="editItem.descripcion"
            label="Descripción del curso"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="editItem.fecha"
            label="Fecha de Registro"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="btnEdicion">
        <v-btn class="mr-3" color="success" @click.prevent="editCurso"
          >Actualizar Curso</v-btn
        >
        <v-btn
          class="ml-3"
          color="warning"
          @click="$router.push('/administracion')"
          >Volver</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "edicion",
  props: ["id"],

  data: function () {
    return {
      editItem: {
        nombre: "",
        url: "",
        cupos: "",
        inscritos: "",
        duracion: "",
        costo: "",
        estado: "",
        codigo: "",
        descripcion: "",
        fecha: "",
      },
    };
  },
  // computed: {},
  methods: {
    ...mapActions(["fetchIdCurso","updateCurso"]),
    async setCurso() {
      let response = await this.fetchIdCurso(this.id);
      console.log(response.data());
      let curso = response.data();
      this.editItem.nombre = curso.nombre;
      this.editItem.url = curso.url;
      this.editItem.cupos = curso.cupos;
      this.editItem.inscritos = curso.inscritos;
      this.editItem.duracion = curso.duracion;
      this.editItem.costo = curso.costo;
      this.editItem.estado = curso.estado;
      this.editItem.descripcion = curso.descripcion;
      this.editItem.fecha = curso.fecha;
      this.editItem.codigo = curso.codigo;
    },

    editCurso() {
      let curso = this.editItem
      curso.id = this.id
      this.updateCurso(curso)
        .then(() => {
          alert("curso actualizado , correctamente");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  // watch: {},
  // components: {},
  // -- Lifecycle Methods
  // beforeCreate() {},
  async created() {
    this.setCurso();
  },
};

// beforeMount() {},
// mounted() {},
// beforeUpdate() {},
// updated() {},
// beforeDestroy() {},
// destroyed() {},
// -- End Lifecycle Methods
</script>

<style scoped>
.btnEdicion {
  display: flex;
  justify-content: center;
}
</style>
