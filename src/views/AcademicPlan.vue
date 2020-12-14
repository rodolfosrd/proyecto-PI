<template>
<div >
    <Header />
    
    <vue-confirm-dialog></vue-confirm-dialog>
    
    <div class="container"> 
        <div class="row">
            <div class="col-sm-12 ">
             <div align="left">
     <h3>Gestionar Planes Académicos</h3>
      <button type="button" class="btn btn-primary btn-sm" v-on:click="add()"> Agregar Plan Académico</button>
    </div>
               
                <br /><br />
                <table class="table table-hover" >
                    <thead>
                        <tr variant="info">
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Level Académico</th>
                            <th scope="col">Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d, index) in list" :key="index">
                            <td>{{ d.ID }} </td>
                            <td>{{ d.name }}</td>
                            <td>{{ d.fecha }}</td>
                            <td>
                                <select class="form-control" name="sel_cursos" id="sel_cursos" v-model="d.curso_id" disabled>
                                    <option value="">Elegir un Curso</option>
                                    <option v-for="curso in listCurso" :key="curso.ID" :value="curso.ID">{{curso.ID + " - " + curso.name}}</option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control" v-model="d.level_id" disabled>
                                    <option value="" >Elegir un Nivel</option>
                                    <option v-for="level in listLevel" :key="level.ID" :value="level.ID">{{level.ID + " - " + level.name}}</option>
                                </select>
                            </td>
                            <td>                            
                                <select class="form-control" id="status" name="status" v-model="d.status" disabled>
                                    <option value="A">Activo</option>
                                    <option value="I">Inactivo</option>
                                </select>
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-secondary btn-sm" @click="edit(d.ID)">
                                        Update
                                    </button>
                                    <button type="button" class="btn btn-warning btn-sm" @click="onDelete(d.ID)">
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
    name: "AcademicPlan",
    data: function () {
        return {
            list: [],
            listCurso: [],
            listLevel: [],
        };
    },
    components: {
        Header,
        Footer
    },
    methods: {
        edit: function (id) {
            this.$router.push("academicplan/form/" + id);
        },
        add: function () {
            this.$router.push("academicplan/form");
        },
        getList: function () {
            client.get("/v1/academicplan").then((res) => {
                this.list = res.data.r;
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
        getLevelList: function () {
            client.get("/v1/educationlevel").then((res) => {
                this.listLevel = res.data.r;
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
                        this.delete(d);
                    }
                }
            })

        },
        delete: function (id) {
            client.delete(`/v1/academicplan/${id}`).then(() => {
                Vue.$toast.open({
                        message: 'Se Eliminó Correctamente',
                        type: 'error',
                        position: 'top-right'
                    });
                this.getList();
                this.getCursoList();
                this.getLevelList();
        })
        .catch((error) => {
            console.error(error);
            this.getList();
            this.getCursoList();
            this.getLevelList();
        });
        },
    },
    created: function () {
        this.getList();
        this.getCursoList();
        this.getLevelList();
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
