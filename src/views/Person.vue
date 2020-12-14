<template>
<div>
    <Header />
    
    <vue-confirm-dialog></vue-confirm-dialog>
    
   
    
    <div class="container">
     
        <div class="row">
            <div class="col-sm-10 ">
             <div align="left">
     <h3>Gestonar Personas</h3>
      <button type="button" class="btn btn-primary btn-sm" v-on:click="add()"> Registrar Persona</button>
    </div>
               
                <br /><br />
                <table class="table table-hover">
                    <thead>
                        <tr variant="info">
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido Paterno</th>
                            <th scope="col">Apellido Materno</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Número</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Contraseña</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d, index) in list" :key="index">
                            <td>{{ d.ID }} </td>
                            <td>{{ d.nombre }}</td>
                            <td>{{ d.appaterno }}</td>
                            <td>{{ d.apmaterno }}</td>
                            <td>{{ d.dni }}</td>
                            <td>{{ d.direccion }}</td>
                            <td>{{ d.telefono }}</td>
                            <td>{{ d.fecha }}</td>
                            <td>{{ d.usuario }}</td>
                            <td>{{ d.password }}</td>

                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-secondary btn-sm" @click="edit(d.ID)">
                                        Update
                                    </button>
                                    <button type="button" class="btn btn-warning btn-sm" @click="onDelete(d)">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div>
    
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
    name: "Person",
    data: function () {
        return {
            list: [],
        };
    },
    components: {
        Header,
        Footer
    },
    methods: {
        edit: function (id) {
            this.$router.push("persons/form/" + id);
        },
        add: function () {
            this.$router.push("persons/form");
        },
        getList: function () {
            client.get("/v1/persons").then((res) => {
                this.list = res.data.r;
                })
            .catch((error) => {
                console.error(error);
        });
        },
        onDelete: function (d) {
            this.$confirm({
                message: `¿Estás seguro de eliminar?`,
                button: {
                    no: 'No',
                    yes: 'Si'
                },
                /**
                 * Callback Function
                 * @param {Boolean} confirm 
                 */
                callback: confirm => {
                    if (confirm) {
                        this.delete(d.ID);
                    }
                }
            })

        },
        delete: function (id) {
            client.delete(`/v1/persons/${id}`).then(() => {
                Vue.$toast.open({
                        message: 'Se Eliminó Correctamente',
                        type: 'error',
                        position: 'top-right'
                    });
                this.getList();
        })
        .catch((error) => {
            console.error(error);
            this.getList();
        });
        },
    },
    created: function () {
        this.getList();
    },
};
</script>

<style scoped>
.izquierda {
    text-align: left;
}
#container {
    /* ... */
    padding-bottom: 81px; /* El tamaño del footer para evitar el sobreposicionamiento */
}
</style>
