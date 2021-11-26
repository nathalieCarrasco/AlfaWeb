<template>
  <div>
    <v-btn depressed color="deep-purple accent-4" @click="logout">
      <v-icon>logout</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { mapActions } from "vuex";
export default {
  name: "Logout",
  // props: {},
  data: function () {
    return {};
  },
  // computed: {},
  methods: {
    ...mapActions(['resetEmail']),

    logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.resetEmail();
  // Sign-out successful.
  alert('si funciona')

  this.$router.push('/login');
}).catch((error) => {
  // An error happened.
   console.log(error);
});
    },
  },
};
</script>

<style scoped></style>
