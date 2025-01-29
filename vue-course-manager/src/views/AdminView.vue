<template>
  <v-container>
    <!-- Title -->
    <h1 class="text-center mb-4">Administración</h1>

    <!-- Add Course Button -->
    <v-row justify="center" class="mb-4">
      <v-col cols="auto">
        <AddCourseModal />
      </v-col>
    </v-row>

    <!-- Courses Table -->
    <v-data-table :headers="headers" :items="courses" class="mb-4">
      <template v-slot:item.costo="{ item }">
        <v-chip color="green" dark>${{ item.costo }}</v-chip>
      </template>
      <template v-slot:item.completado="{ item }">
        <v-chip :color="item.completado ? 'blue lighten-2' : 'grey'" dark>
          {{ item.completado ? 'Sí' : 'No' }}
        </v-chip>
      </template>
      <template v-slot:item.fecha_registro="{ item }">
        <v-chip color="green" dark>{{ item.fecha_registro }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="blue" icon @click="openEditCourse(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red" icon @click="openDeleteCourse(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <EditCourseModal ref="editCourseModal" :course="selectedCourse" />
    <DeleteCourseModal ref="deleteCourseModal" @courseDeleted="refreshCourses" />


    <!-- Summary Statistics -->
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card class="pa-3 mb-3 d-flex align-center" color="deep-purple lighten-3">
          <v-icon left>mdi-account-multiple</v-icon>
          Cantidad total de alumnos permitidos:&nbsp; <strong>{{ totalCapacity }}</strong>&nbsp; alumnos.
        </v-card>

        <v-card class="pa-3 mb-3 d-flex align-center" color="blue lighten-3">
          <v-icon left>mdi-account-check</v-icon>
          Cantidad total de alumnos inscritos:&nbsp; <strong>{{ totalEnrolled }}</strong>&nbsp; alumnos.
        </v-card>

        <v-card class="pa-3 mb-3 d-flex align-center" color="green lighten-3">
          <v-icon left>mdi-account-clock</v-icon>
          Cantidad total de cupos restantes:&nbsp; <strong>{{ totalAvailableSlots }}</strong>&nbsp; cupos.
        </v-card>

        <v-card class="pa-3 mb-3 d-flex align-center" color="red lighten-3">
          <v-icon left>mdi-check-circle</v-icon>
          Cantidad total de cursos terminados:&nbsp; <strong>{{ totalCompletedCourses }}</strong>&nbsp; cursos.
        </v-card>

        <v-card class="pa-3 mb-3 d-flex align-center" color="orange lighten-3">
          <v-icon left>mdi-bell-ring-outline</v-icon>
          Cantidad total de cursos activos:&nbsp;  <strong>{{ totalActiveCourses }}</strong>&nbsp;  cursos.
        </v-card>

        <v-card class="pa-3 mb-3 d-flex align-center" color="purple lighten-3">
          <v-icon left>mdi-book-open-variant</v-icon>
          Cantidad total de cursos:&nbsp; <strong>{{ totalCourses }}</strong>&nbsp; cursos.
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import AddCourseModal from '@/components/AddCourseModal.vue';
import EditCourseModal from '@/components/EditCourseModal.vue';
import DeleteCourseModal from "@/components/DeleteCourseModal";

export default {
  name: 'AdminView',
  components: { AddCourseModal, EditCourseModal, DeleteCourseModal  },
  computed: {
    courses() {
      return this.$store.state.courses;
    },
    ...mapGetters([
      'totalCourses',
      'totalActiveCourses',
      'totalCompletedCourses',
      'totalEnrolled',
      'totalAvailableSlots',
      'totalCapacity'
    ]),
  },
  data() {
    return {
      headers: [
        { text: 'Curso', value: 'nombre' },
        { text: 'Cupos', value: 'cupos' },
        { text: 'Inscritos', value: 'inscritos' },
        { text: 'Duración', value: 'duracion' },
        { text: 'Costo', value: 'costo' },
        { text: 'Terminado', value: 'completado', sortable: false },
        { text: 'Fecha', value: 'fecha_registro' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      selectedCourse: null,
    };
  },
  methods: {
    ...mapMutations(['deleteCourse']),
    openEditCourse(course) {
      this.selectedCourse = course;
      this.$refs.editCourseModal.open();
    },
    openDeleteCourse(course) {
      this.$refs.deleteCourseModal.open(course);
    },
    refreshCourses(){
      this.$forceUpdate();
    }
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  color: #3f51b5;
}
</style>
