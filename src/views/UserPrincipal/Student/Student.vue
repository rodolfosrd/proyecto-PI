<template>
  <div>
    <Header />

    <h1>Hola soy Estudiante</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
          <div align="left">
            <h3>Agregar Estudiante</h3>
            <button type="button" class="btn btn-info btn-sm" v-on:click="add()">Registrar Estudiante</button>
          </div>

          <br /><br />
          <table class="table table-hover">
            <thead>
              <tr variant="info">
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Código Institucional</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(d, index) in list" :key="index">
                <td>{{ d.ID }}</td>
                <td>{{ d.nombre }}</td>
                <td>{{ d.appaterno }}</td>

                <td>
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-warning btn-sm" @click="edit(d.ID)">Update</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="onDelete(d)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import client from "../../../api";

import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(VueToast);

export default {
    name: "Student",
    data: function () {
        return {
            list: [],
        };
    },
    components: {
        Header
    },
    methods: {
        edit: function (id) {
            this.$router.push("persons/form/" + id);
        },
        add: function () {
            this.$router.push("persons/form");
        },
        getList: function () {
            client.get("/v1/estudiante").then((res) => {
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
            client.delete(`/v1/estudiante/${id}`).then(() => {
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

<style scoped></style>
