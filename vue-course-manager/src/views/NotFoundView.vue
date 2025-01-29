<template>
  <v-container class="text-center">
    <h1>404 - Page Not Found</h1>
    <p>La página que buscas no existe. Por favor, revisa la URL o regresa a la página de inicio.</p>
    <v-btn color="primary" to="/">Volver a página de inicio</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundView',
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
  color: #f44336;
}
p {
  margin: 1rem 0;
}
</style>
