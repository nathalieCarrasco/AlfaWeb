<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="datosIngreso">
            <h2>User: usuario1@alfaweb.com</h2>
            <h2>Pass: 1234567</h2>
          </div>

          <h2 class="tituloLogin mt-3 mb-5">Login de Usuario</h2>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="user"
              :counter="10"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="pass"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-2"
              label="Contraseña"
              hint="Min 6 caracteres"
              value="fafaffa"
              class="input-group--focused"
            ></v-text-field>

            <div class="btnForm">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click.prevent="login"
                >INICIAR SESION</v-btn
              >

              <v-btn color="error" class="mr-4"> LIMPIAR FORMULARIO </v-btn>

              <v-btn color="warning"  @click="$router.push('/registro')"> IR A REGISTRO </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { mapActions } from "vuex";

export default {
  name: "Login",
  // props: {},
  data: function () {
    return {
      user: "",
      pass: "",
      show2: false,
      rules: {
        required: (value) => !!value || "Contraseña requerida",
        min: (v) => v.length >= 6 || "Min 6 caracteres",
      },
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail requerido",
        (v) => /.+@.+\..+/.test(v) || "El E-mail debe ser válido",
      ],
    };
  },
  // computed: {},
  methods: {
    ...mapActions(['setMail']),
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth,this.user, this.pass)
        .then((userCredential) => {
          this.setMail(this.user)
          // Signed in
          const user = userCredential.user;
          console.log(user)
          this.$router.push('/')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert('errorMessage')
        });
    },
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

<style scoped>
.tituloLogin {
  font-size: 40px;
}
.datosIngreso {
  text-align: center;
}
.btnForm {
  text-align: center;
}
</style>
