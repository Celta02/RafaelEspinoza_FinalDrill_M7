<template>
  <v-app-bar app>
    <v-toolbar-title>Cursos Alfa Web</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon to="/" exact>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon to="/admin">
      <v-icon>mdi-wrench</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
