<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Curso</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="editableCourse.nombre" label="Nombre del curso" required></v-text-field>
          <v-text-field v-model="editableCourse.img" label="Imagen URL" required></v-text-field>
          <v-text-field v-model.number="editableCourse.cupos" label="Cupos" type="number" required></v-text-field>
          <v-text-field v-model.number="editableCourse.inscritos" label="Inscritos" type="number" required></v-text-field>
          <v-text-field v-model="editableCourse.duracion" label="Duración" required></v-text-field>
          <v-text-field v-model="editableCourse.fecha_registro" label="Fecha de Registro" type="date" required></v-text-field>
          <v-text-field v-model.number="editableCourse.costo" label="Costo ($)" type="number" required></v-text-field>
          <v-textarea v-model="editableCourse.descripcion" label="Descripción" required></v-textarea>

          <v-switch v-model="editableCourse.completado" label="¿Curso terminado?" @change="handleCompletionChange"></v-switch>
        </v-form>

        <v-alert v-if="error" type="error" dense>
          La cantidad de inscritos no puede ser mayor que los cupos disponibles.
        </v-alert>
      </v-card-text>

      <v-card-actions class="d-flex justify-start">
        <v-btn color="green" @click="saveChanges">Guardar</v-btn>
        <v-btn color="yellow" @click="resetForm">Restablecer</v-btn>
        <v-btn color="red" @click="close">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    course: Object,
  },
  data() {
    return {
      dialog: false,
      valid: false,
      error: false,
      editableCourse: {},
      originalCourse: {},
    };
  },
  watch: {
    course: {
      immediate: true,
      handler(newCourse) {
        this.editableCourse = { ...newCourse };
        this.originalCourse = { ...newCourse };

        if (this.editableCourse.fecha_registro) {
          const parts = this.editableCourse.fecha_registro.split('/');
          this.editableCourse.fecha_registro = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      },
    },
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      this.editableCourse = { ...this.originalCourse };
      this.error = false;
    },
    handleCompletionChange() {
      if (this.editableCourse.completado) {
        this.editableCourse.inscritos = 0;
      }
    },
    saveChanges() {
      if (this.editableCourse.inscritos > this.editableCourse.cupos) {
        this.error = true;
        return;
      }

      if (this.editableCourse.fecha_registro) {
        const parts = this.editableCourse.fecha_registro.split('-');
        this.editableCourse.fecha_registro = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }

      this.$store.commit('updateCourse', this.editableCourse);
      this.close();
    },
  },
};
</script>
