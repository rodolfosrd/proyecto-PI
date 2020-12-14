<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#" class="pl-4">SIS. COLEGIO</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button size="sm" class="btn btn-dark"  @click="logout()">Sign off</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="navis">
      <b-nav tabs pills align="center">
        <b-nav-item to="/persons">Registrar Persona</b-nav-item>
        <!-- Comment <b-nav-item to="/docent">Docentes</b-nav-item>
        <b-nav-item to="/student">Estudiantes</b-nav-item>
        <b-nav-item to="/curse">Cursos</b-nav-item>
        <b-nav-item>Nivel </b-nav-item>
        <b-nav-item>Unidad </b-nav-item>
        <b-nav-item>Grupo </b-nav-item>-->
        <b-nav-item to="/academicperiod">Periodo Académico</b-nav-item>
        <b-nav-item to="/academicplan">Plan Acádemico </b-nav-item>

        <!--<b-nav-item>Jerarquia </b-nav-item>
        <b-nav-item>Inscripción</b-nav-item>        
        <b-nav-item>Plan Docente</b-nav-item>
        <b-nav-item>Horario Académico</b-nav-item>-->
      </b-nav>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";


Vue.use(VueToast);
export default {
  methods: {
    logout() {
      //if(!token) {
      //	return false;
      //}
      //axios.get("http://weblloapi.dev/logout?api_token="+token)
      //.then(response => {
      localStorage.removeItem("user");
      Vue.$toast.open({
        message: "Se Cerro la Sesión Correctamente",
        type: "error",
        position: "top-right",
      });
      this.$router.push("/");
      //	Event.$emit('logout');
      //});
    },
  },
};
</script>

<style scoped>
.boton {
  border-radius: 50px;
  padding: 5px 15px 5px 15px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: red;
  color: white;
  text-align: center;
}
</style>
