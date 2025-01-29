<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title class="headline">Eliminar Curso</v-card-title>

      <v-card-text>
        ¿Estás seguro de que quieres eliminar el curso <strong>{{ course?.nombre }}</strong>? <br />
        Esta acción no se puede deshacer.
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn color="grey" @click="close">Cancelar</v-btn>
        <v-btn color="red" @click="confirmDelete">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      course: null,
    };
  },
  methods: {
    open(course) {
      this.course = course;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    confirmDelete() {
      this.$store.commit('deleteCourse', this.course.id);
      this.$emit('courseDeleted');
      this.close();
    }
  },
};
</script>
