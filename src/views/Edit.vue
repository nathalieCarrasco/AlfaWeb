<template>
  <v-container>
    <h1 class="tituloLogin mt-3 mb-5">Editar Curso :{{id}}</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="form.nombre"
        :counter="10"
        :rules="nameRules"
        label="Nombre"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.url"
        :rules="urlRules"
        label="url de la imagen "
        required
      ></v-text-field>

      <v-text-field
        v-model="form.cupos"
        type="number"
        :rules="cuposRules"
        label="cupos del curso "
        required
      ></v-text-field>

      <v-text-field
        v-model="form.inscritos"
        type="number"
        :rules="inscritosRules"
        label="Inscritos "
        required
      ></v-text-field>

      <v-text-field
        v-model="form.costo"
        type="number"
        :rules="costosRules"
        label="Costo del curso"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.duracion"
        :rules="duracionRules"
        label="Duracion del curso "
        required
      ></v-text-field>

      <v-text-field
        v-model="form.codigo"
        :counter="10"
        :rules="nameRules"
        label="codigo curso"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.fecha"
        type="datetime-local"
        :counter="10"
        :rules="timeRules"
        label=""
        required
      ></v-text-field>

      <v-textarea
        v-model="form.descripcion"
        rows="2"
        label="Descripción"
      ></v-textarea>

      <v-sheet width="100%" height="100%" class="pa-12">
        <v-switch flat :label="`estado terminado: `"></v-switch>
      </v-sheet>

      <v-btn @click.prevent="new_curso" color="success" class="mr-4">
        agregar curso
      </v-btn>

      <v-btn color="error" class="mr-4"> Reset Form </v-btn>

      <v-btn color="warning"> Reset Validation </v-btn>
    </v-form>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "newcurso",
  // props: {},
  data: function () {
    return {
      form: {
        codigo: "",
        nombre: "",
        url: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        costo: 0,
        descripcion: "",
        fecha: new Date(),
        estado: false,
      },
    };
  },
  // computed: {},
  methods: {
    new_curso() {
      // this.addcurso(this.form)
      //   .then(() => {
      //     alert("curso agregado con exito");

      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    ...mapActions(["addcurso"]),
  },
  // watch: {},
  // components: {},
  // -- Lifecycle Methods
  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  // mounted() {},
  // beforeUpdate() {},
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  // -- End Lifecycle Methods
};
</script>

<style scoped></style>
