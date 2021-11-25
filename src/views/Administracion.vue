<template>
  <v-container>
    <h1 class="mb-2 text-center">Administración</h1>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="cursos"
          :items-per-page="5"
          class="elevation-1 mt-5"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Agregar Curso
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h4">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.codigo"
                            :error-messages="codigoErrors"
                            label="Código"
                            required
                            @input="$v.editedItem.codigo.$touch()"
                            @blur="$v.editedItem.codigo.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.nombre"
                            :error-messages="nombreErrors"
                            label="Nombre"
                            required
                            @input="$v.editedItem.nombre.$touch()"
                            @blur="$v.editedItem.nombre.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            type="number"
                            v-model="editedItem.cupos"
                            :error-messages="cuposErrors"
                            label="Cupos"
                            required
                            @input="$v.editedItem.cupos.$touch()"
                            @blur="$v.editedItem.cupos.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            type="number"
                            v-model="editedItem.inscritos"
                            :error-messages="inscritosErrors"
                            label="Inscritos"
                            required
                            @input="$v.editedItem.inscritos.$touch()"
                            @blur="$v.editedItem.inscritos.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            type="number"
                            v-model="editedItem.costo"
                            :error-messages="costoErrors"
                            label="Costo"
                            required
                            @input="$v.editedItem.costo.$touch()"
                            @blur="$v.editedItem.costo.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.duracion"
                            :error-messages="duracionErrors"
                            label="Duración"
                            required
                            @input="$v.editedItem.duracion.$touch()"
                            @blur="$v.editedItem.duracion.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.url"
                            :error-messages="urlErrors"
                            label="URL Imagen"
                            required
                            @input="$v.editedItem.url.$touch()"
                            @blur="$v.editedItem.url.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            rows="2"
                            v-model="editedItem.descripcion"
                            :error-messages="descripcionErrors"
                            label="Descripción"
                            required
                            @input="$v.editedItem.descripcion.$touch()"
                            @blur="$v.editedItem.descripcion.$touch()"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.fecha"
                            :error-messages="fechaErrors"
                            label="Fecha"
                            required
                            placeholder="01/01/2021"
                            @input="$v.editedItem.fecha.$touch()"
                            @blur="$v.editedItem.fecha.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-switch
                            v-model="editedItem.estado"
                            :label="`Terminado: ${
                              editedItem.estado ? 'Sí' : 'No'
                            }`"
                          ></v-switch>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text 
                    @click="agregar">
                      Agregar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="280">
                <v-card>
                  <v-card-title class="text-h5 text-justify">
                    ¿Estás seguro de querer borrar este curso?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm"
                    >
                      OK
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
          
            <v-icon small class="mr-2" @click="editItem(item)">
              pencil
            </v-icon>
            
            <v-icon small @click="deleteItem(item)">delete </v-icon>
          </template>
          <template v-slot:[`item.data.estado`]="{ item }">
            <span>{{ item.data.estado ? "Sí" : "No" }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert dense outlined color="purple" icon="account-group">
          Cantidad total de alumnos permitidos: {{ getTotalCupos }}
        </v-alert>

        <v-alert dense outlined color="blue" icon="account-multiple-check">
          Cantidad total de alumnos inscritos: {{ getTotalInscritos }}
        </v-alert>

        <v-alert dense outlined color="pink" icon="account-clock">
          Cantidad total de cupos restantes: {{ getTotalCuposRestantes }}
        </v-alert>
        <v-alert dense outlined color="red" icon="cancel">
          Cantidad total de cursos terminados: {{getTotalCursosTerminados}}
        </v-alert>

        <v-alert dense outlined color="teal" icon="check">
          Cantidad total de cursos activos: {{ getTotalCursosActivos }}
        </v-alert>

        <v-alert dense outlined color="deep-orange" icon="bell-ring">
          Cantidad total de cursos:  {{ getTotalCursos }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions,mapState,mapGetters } from "vuex";




  export default {
    name: "administracion",
    data () {
      return {
        id:'curso.id',
        dialog: false,
        dialogDelete: false,
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
          { text: "Acciones", value: "actions", sortable: false },
        ],
   editedIndex: -1,

      editedItem: {
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
      defaultItem: {
        codigo: "",
        nombre: "",
        url: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        costo: 0,
        estado: "",
        descripcion: "",
        fecha: "",
      },
    };
  },

    

  computed: {
    ...mapState(['cursos']),
    ...mapGetters([
      "getCursos",
      "getTotalCupos",
      "getTotalInscritos",
      "getTotalCuposRestantes",
      "getTotalCursosTerminados",
      "getTotalCursosActivos",
      "getTotalCursos",
    ]),
    formTitle() {
      return this.editedIndex ?"Editar Curso" :"Agregar Curso";
    },
  },
  methods: {
    ...mapActions([
      "fetchCursos","addcurso"

    ]),
    fetchCursos() {
      this.fetchCursos();
    },
    editItem(item) {
      this.$router.push("/edit_curso/" + item.id);
    },
  
    deleteItem(item) {
     this.idEliminar = item.id;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteCurso(this.idEliminar)
        .then((resp) => {
          alert("Borrado exitosamente");
          this.idEliminar = "";
          this.dialogDelete = false;
          this.fetchCursos();
        })
        .catch((error) => {
          alert("Ups, hubo un error al eliminar el curso" + error + "intentalo , otra vez");
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

      agregar () {
       // console.log(this.editedItem)
        this.addcurso(this.editedItem)
        .then(() => {
          alert("curso agregado con exito");

        })
        .catch((error) => {
          alert("Ups, hubo un error al agregar" + error);
        });
      },
      reset() {
      this.addItem.nombre = "";
      this.addItem.img = "";
      this.addItem.cupos = "";
      this.addItem.inscritos = "";
      this.addItem.duracion = "";
      this.addItem.costo = "";
      this.addItem.estado = "";
      this.addItem.fecha = "";
      this.addItem.id = "";
      this.addItem.descripcion = "";
    },
  },
  
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  // components: {},
  // -- Lifecycle Methods
  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  mounted() {
    this.editedItem = { ...this.defaultItem };
  },
  // beforeUpdate() {},
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  // -- End Lifecycle Methods
};
</script>

<style scoped>
.btnModalAgregar, .textoEliminar {
  display: flex;
  justify-content: center;
}


</style>