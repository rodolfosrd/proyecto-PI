<template>
<div>
    <Header />
    <div class="container">
        <form action="" @submit="onSubmit" class="form-horizontal">
            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Nombres</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="name" id="name" v-model="d.nombre" required>
                </div>
            </div>
            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Apellido Paterno</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="appaterno" id="appaterno" v-model="d.appaterno" required>
                </div>
            </div>
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">Apellido Materno</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" name="apmaterno" id="apmaterno" v-model="d.apmaterno" required>
                    </div>
                </div>
            </div>
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">DNI</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" pattern="[0-9]{8}" name="dni" id="dni" v-model="d.dni" required>
                    </div>
                </div>
            </div>
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">Dirección</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" name="direccion" id="direccion" v-model="d.direccion" required>
                    </div>
                </div>
            </div>
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">N° Teléfono</label>
                    <div class="col-sm-7">
                        <input type="tel" class="form-control" name="numero" id="numero" pattern="[0-9]{9}" v-model="d.telefono" required>
                    </div>
                </div>
            </div>
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">Fecha Nacimiento</label>
                    <div class="col-sm-7">
                        <input type="date" class="form-control" name="fecha" id="fecha" v-model="d.fecha" required>
                    </div>
                </div>
            </div>
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">Usuario</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" name="usuario" id="usuario" v-model="d.usuario" required>
                    </div>
                </div>
            </div>
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">Password</label>
                    <div class="col-sm-7">
                        <input type="password" class="form-control" name="password" id="password" v-model="d.password" required>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Guardar</button>
                <b-button type="reset" variant="secondary">Limpiar</b-button>
                <button type="button" class="btn btn-warning margen" v-on:click="salir()">Salir</button>
            </div>
        </form>
    </div>
   <!-- <Footer />  -->
</div>
</template>

<script>
import Header from '@/components/Header.vue';
//import Footer from '@/components/Footer.vue';
import client from "../api";

import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(VueToast);

export default {
  name: "PersonForm",
  data: function () {
    return {
      message: "",
      showMessage: false,
      d: {
        ID: "",
        nombre: "",
        appaterno: "",
        apmaterno: "",
        dni: "",
        direccion: "",
        telefono: "",
        fecha: "",
        usuario: "",
        password: "",
      },

    };
  },
   components: {
        Header//,
       // Footer
    },
  methods: {
    
    back: function () {this.$router.push("/persons");},

    create: function (payload) {
      client.post("/v1/persons", payload)
        .then(() => {
          console.log(payload);
          Vue.$toast.open({
            message: 'Se agrego Correctamente a ' + this.d.nombre,
            type: 'success',
            position: 'top-right'
            });
        this.message = "Person added!";
        this.$router.push("/persons?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
        this.d.nombre="";
        this.d.appaterno="";
        this.d.apmaterno="";
        this.d.dni="";
        this.d.direccion="";
        this.d.telefono="";
        this.d.fecha="";
        this.d.usuario="";
        this.d.password="";
    },
    onSubmit: function (evt) {
      evt.preventDefault();

      const payload = {
        nombre: this.d.nombre,
        appaterno: this.d.appaterno,
        apmaterno: this.d.apmaterno,
        dni: this.d.dni,
        direccion: this.d.direccion,
        telefono: this.d.telefono,
        fecha: this.d.fecha,
        usuario: this.d.usuario,
        password: this.d.password,
      };
      if (this.d.ID > 0) {
        this.update(payload, this.d.ID);
      } else {
        this.create(payload);
      }
      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
    },

    getById: function (id) {client.get(`/v1/persons/${id}`).then((res) => {
          this.d = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    update: function (payload, id) {
      client.put(`/v1/persons/${id}`, payload)
        .then(() => {
          console.log(payload);
          Vue.$toast.open({
                        message: 'Se Actualizó Correctamente a ' + this.d.nombre,
                        type: 'info',
                        position: 'top-right'
        });

          this.message = "Person updated!";
          this.$router.push("/persons?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.error(error);
          //this.getBooks();
        });
    },
    salir() {
            this.$router.push("/persons");
        },
  },

  created: function () {
    this.d.ID = this.$route.params.id;
    if (this.d.ID > 0) {
      this.getById(this.d.ID);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left {
    text-align: left;
}
#container {
    /* ... */
    padding-bottom: 81px; /* El tamaño del footer para evitar el sobreposicionamiento */
}
</style>