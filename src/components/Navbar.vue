<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >

      <v-toolbar-title>
        <h2 class="mr-9">Cursos AlfaWeb</h2>
      </v-toolbar-title>

      <v-spacer></v-spacer>
<!--iconos -->
      <v-btn
          color="deep-purple accent-4"
        >
          <v-icon>home</v-icon>
        </v-btn>

      <v-btn 
        color="deep-purple accent-4">
        <v-icon> forum</v-icon>
      </v-btn>
      <span class="mr-2 d-none d-md-inline">{{ email }}</span>
      <Logout />
    </v-app-bar>
  </div>
</template>
<script>
import Logout from "@/components/Logout.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "Navbar",
  // props: {},
  data: function () {
    return {};
  },
  computed: {
    ...mapState(["email"]),
  },
  // watch: {},
  components: {
    Logout,
  },
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
</style>