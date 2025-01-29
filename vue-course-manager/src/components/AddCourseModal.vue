<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus</v-icon> Agregar Curso
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Agregar Curso</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="newCourse.nombre" label="Nombre del curso" required></v-text-field>
          <v-text-field v-model="newCourse.img" label="Imagen URL" required></v-text-field>
          <v-text-field v-model.number="newCourse.cupos" label="Cupos" type="number" required></v-text-field>
          <v-text-field v-model.number="newCourse.inscritos" label="Inscritos" type="number" required></v-text-field>
          <v-text-field v-model="newCourse.duracion" label="Duración" required></v-text-field>
          <v-text-field v-model="newCourse.fecha_registro" label="Fecha de Registro" type="date" required></v-text-field>
          <v-text-field v-model.number="newCourse.costo" label="Costo ($)" type="number" required></v-text-field>
          <v-textarea v-model="newCourse.descripcion" label="Descripción" required></v-textarea>
        </v-form>

        <v-alert v-if="error" type="error" dense>
          La cantidad de inscritos no puede ser mayor que los cupos disponibles.
        </v-alert>
      </v-card-text>

      <v-card-actions class="d-flex justify-start">
        <v-btn color="green" @click="submit">Agregar</v-btn>
        <v-btn color="yellow" @click="resetForm">Limpiar Formulario</v-btn>
        <v-btn color="red" @click="close">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      error: false,
      newCourse: {
        nombre: '',
        img: '',
        cupos: null,
        inscritos: null,
        duracion: '',
        fecha_registro: '',
        costo: null,
        descripcion: '',
        completado: false,
      },
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      this.newCourse = {
        nombre: '',
        img: '',
        cupos: null,
        inscritos: null,
        duracion: '',
        fecha_registro: '',
        costo: null,
        descripcion: '',
        completado: false,
      };
      this.error = false;
    },
    submit() {
      if (this.newCourse.inscritos > this.newCourse.cupos) {
        this.error = true;
        return;
      }

      this.$store.commit('addCourse', {
        id: Date.now(),
        ...this.newCourse,
      });

      this.close();
    },
  },
};
</script>
