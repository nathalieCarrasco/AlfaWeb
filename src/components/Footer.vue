<template>
  <div>
    <v-footer dark padless class="mt-5">
      <v-card class="flex" flat tile>
        <v-card-title class="UpFooter">
          <strong class="subheading">
            Únete a millones de estudiante alrededor del mundo que ya están
            aprendiendo en AlfaWeb.
          </strong>

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="28px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>AlfaWeb</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>

export default {
  name: "footer-component",
  // props: {},
  data: function () {
    return {
      icons: ["facebook","twitter", "linkedin", "instagram"],
    };
  },
  // computed: {},
  // methods: {},
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
 .UpFooter {
     background-color: #9400ff;
 }
</style>