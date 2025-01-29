<template>
  <v-container>
    <h1 class="text-center mb-4">Lista de Cursos</h1>
    <v-row>
      <v-col
          v-for="course in courses"
          :key="course.id"
          cols="12"
          sm="6"
          md="4"
      >
        <v-card>
          <v-img :src="course.img" height="200px"></v-img>
          <v-card-title>{{ course.nombre }}</v-card-title>
          <v-card-text>
            <p>{{ course.descripcion }}</p>
            <p><strong>Costo:</strong> ${{ course.costo }}</p>
            <p><strong>Duración:</strong> {{ course.duracion }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['courses']),
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  color: #3f51b5;
}
</style>

