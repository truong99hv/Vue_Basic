<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height"
      ><v-btn> <RouterLink to="/">Navbar</RouterLink> </v-btn>
      <v-btn> <RouterLink to="/todos">Todos</RouterLink> </v-btn>
    </v-responsive>
  </v-container>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
