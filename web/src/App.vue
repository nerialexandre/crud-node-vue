<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          :src="Logo"
          transition="scale-transition"
          width="40"
        />

        <h1>Lista de livros</h1>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Logo from '@/assets/logo.png'
export default {
  name: 'App',

  data: () => ({
    Logo
  })
}
</script>
<style lang="scss">
// style.scss
@import "~sweetalert2/src/variables";

$swal2-font: "Roboto", sans-serif !important;

@import "~sweetalert2/src/sweetalert2";
</style>
