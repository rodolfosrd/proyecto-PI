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
                    <label for="" class="control-label col-sm-2">Fecha </label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" name="fecha" id="fecha" v-model="d.fecha" required>
                    </div>
            </div>
            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Curso</label>
                <div class="col-sm-10">                    
                    <select class="form-control" name="sel_cursos" id="sel_cursos" v-model="d.curso_id">
                      <option value="" disabled>Elegir un Curso</option>
                      <option v-for="curso in listCurso" :key="curso.ID" :value="curso.ID">{{curso.ID + " - " + curso.name}}</option>
                    </select>
                </div>                
            </div>

            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Level</label>
                <div class="col-sm-10">                    
                    <select class="form-control" v-model="d.level_id" >
                      <option value="" disabled>Elegir un Nivel</option>
                      <option v-for="level in listLevel" :key="level.ID" :value="level.ID">{{level.ID + " - " + level.name}}</option>
                    </select>
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
  name: "AcademicPlanForm",
  data: function () {
    return {
      message: "",
      showMessage: false,
      d: {
        ID: "",
        name: "",
        fecha: "",
        curso_id: "",
        level_id: "",
        status: "",        
      },
      listCurso: [],
      listLevel: [],
    };
  },
   components: {
        Header,
        Footer
    },
  methods: {
    
    back: function () {this.$router.push("/academicplan");},

    create: function (payload) {
      client.post("/v1/academicplan", payload)
        .then(() => {
          Vue.$toast.open({
            message: 'Se agrego Correctamente a ' + this.d.name,
            type: 'success',
            position: 'top-right'
            });
        this.message = "Academic Plan added!";
        this.$router.push("/academicplan?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
      //  this.d.name="";
      //  this.d.status=""; 
        this.getLevelList();
        this.getCursoList();
    },
    onSubmit: function (evt) {
      evt.preventDefault();

      const payload = {
        name: this.d.name,
        fecha: this.d.fecha,
        status: this.d.status,  
        curso_id: this.d.curso_id,  
        level_id: this.d.level_id,        
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

    getById: function (id) {client.get(`/v1/academicplan/${id}`).then((res) => {
          this.d = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getLevelList: function () {
            client.get("/v1/educationlevel").then((res) => {
                this.listLevel = res.data.r;
                })
            .catch((error) => {
                console.error(error);
        });
        },
    
    getCursoList: function () {
            client.get("/v1/course").then((res) => {
                this.listCurso = res.data.r;
                })
            .catch((error) => {
                console.error(error);
        });
        },

    update: function (payload, id) {
      client.put(`/v1/academicplan/${id}`, payload)
        .then(() => {
          Vue.$toast.open({
                        message: 'Se Actualizó Correctamente a ' + this.d.name,
                        type: 'info',
                        position: 'top-right'
        });

          this.message = "Academic Plan updated!";
          this.$router.push("/academicplan?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.error(error);
        });
    },
    salir() {
            this.$router.push("/academicplan");
        },
  },

  created: function () {    
    this.getLevelList();
    this.getCursoList();
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