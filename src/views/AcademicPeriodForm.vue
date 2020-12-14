<template>
<div>
    <Header />
    <div class="container">
        <form action="" @submit="onSubmit" class="form-horizontal">
            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Nombre</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="name" id="name" v-model="d.name" required>
                </div>
            </div>

            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Estado</label>
                <div class="col-sm-10">                    
                    <input type="radio" id="activo" name="status" value="A" v-model="d.status" required>
                    <label for="activo" class="control-label col-sm-2">Activo</label>
                    <input type="radio"  id="inactivo" name="status" value="I" v-model="d.status" required>
                    <label for="inactivo" class="control-label col-sm-2">Inactivo</label>
                </div>
            </div>              

             <div class="form-group">
                <button type="submit" class="btn btn-primary">Guardar</button>
                <b-button type="reset" variant="secondary">Limpiar</b-button>
                <button type="button" class="btn btn-warning margen" v-on:click="salir()">Salir</button>
            </div>
        </form>
    </div>
    <Footer /> 
</div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import client from "../api";

import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(VueToast);

export default {
  name: "AcademicPeriodForm",
  data: function () {
    return {
      message: "",
      showMessage: false,
      d: {
        ID: "",
        name: "",
        status: "",        
      },

    };
  },
   components: {
        Header,
        Footer
    },
  methods: {
    
    back: function () {this.$router.push("/academicperiod");},

    create: function (payload) {
      client.post("/v1/academicperiod", payload)
        .then(() => {
          console.log(payload);
          Vue.$toast.open({
            message: 'Se agrego Correctamente a ' + this.d.name,
            type: 'success',
            position: 'top-right'
            });
        this.message = "Academic Period added!";
        this.$router.push("/academicperiod?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
        this.d.name="";
        this.d.status="";        
    },
    onSubmit: function (evt) {
      evt.preventDefault();

      const payload = {
        name: this.d.name,
        status: this.d.status,        
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

    getById: function (id) {client.get(`/v1/academicperiod/${id}`).then((res) => {
          this.d = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    update: function (payload, id) {
      client.put(`/v1/academicperiod/${id}`, payload)
        .then(() => {
          console.log(payload);
          Vue.$toast.open({
                        message: 'Se Actualizó Correctamente a ' + this.d.name,
                        type: 'info',
                        position: 'top-right'
        });

          this.message = "Academic Period updated!";
          this.$router.push("/academicperiod?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.error(error);
          //this.getBooks();
        });
    },
    salir() {
            this.$router.push("/academicperiod");
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