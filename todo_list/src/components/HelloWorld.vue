<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="list-btn d-flex justify-space-between">
        <v-btn> <RouterLink to="/test">Test</RouterLink> </v-btn>
        <v-btn> <RouterLink to="/todos">Todos</RouterLink> </v-btn>
      </div>
    </v-responsive>
  </v-container>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
