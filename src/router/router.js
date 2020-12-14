import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import AcademicPeriod from '../views/AcademicPeriod.vue';
import AcademicPeriodForm from '../views/AcademicPeriodForm.vue';

import AcademicPlan from '../views/AcademicPlan.vue';
import AcademicPlanForm from '../views/AcademicPlanForm.vue';

import Person from '../views/Person.vue';
import PersonForm from '../views/PersonForm.vue';

import Docente from '../views/UserPrincipal/Docentes/Docentes.vue';
import Docente_form from '../views/UserPrincipal/Docentes/Docente_form.vue';

import Student from '../views/UserPrincipal/Student/Student.vue';
import StudentForm from '../views/UserPrincipal/Student/Student.vue';

import Curse from '../views/UserPrincipal/Cursos/Curse.vue';
import CurseForm from '../views/UserPrincipal/Cursos/CurseForm.vue';

import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';



Vue.use(VueRouter);



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/persons',
            name: 'Person',
            component: Person,
        },
        {
            path: '/persons/form',
            name: 'PersonForm',
            component: PersonForm,

        },
        {
            path: '/persons/form/:id',
            name: 'PersonForme',
            component: PersonForm,
        },
        {
            path: '/academicperiod',
            name: 'AcademicPeriod',
            component: AcademicPeriod,
        },
        {
            path: '/academicperiod/form',
            name: 'AcademicPeriodForm',
            component: AcademicPeriodForm,

        },
        {
            path: '/academicperiod/form/:id',
            name: 'AcademicPeriodForme',
            component: AcademicPeriodForm,
        },
        {
            path: '/course',
            name: 'Course',
            component: AcademicPlan,
        },
        {
            path: '/educationlevel',
            name: 'AcademicLevel',
            component: AcademicPlan,
        },
        {
            path: '/academicplan',
            name: 'AcademicPlan',
            component: AcademicPlan,
        },
        {
            path: '/academicplan/form',
            name: 'AcademicPlanForm',
            component: AcademicPlanForm,

        },
        {
            path: '/academicplan/form/:id',
            name: 'AcademicPlanForme',
            component: AcademicPlanForm,
        },
        {
            path: '/docent',
            name: 'Docente',
            component: Docente,
        },
        {
            path: '/docent/form',
            name: 'DocentForm',
            component: Docente_form,

        },
        {
            path: '/student',
            name: 'Student',
            component: Student,
        },
        {
            path: '/student/form',
            name: 'StudentForm',
            component: StudentForm,
        },
        {
            path: '/curse',
            name: 'Curse',
            component: Curse,
        },
        {
            path: '/curse/form',
            name: 'CurseForm',
            component: CurseForm,
        },

        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        },
    ],
});

let whiteRoutes = [
    "LoginForm",
    "Home",
    "Login",
]

router.beforeEach((to, from, next) => {
    console.log(`${from.path} to ${to.path}`);
    let isAuthenticated = false;
    if (localStorage.getItem('user') != null) {
        isAuthenticated = true;
    }
    if (!whiteRoutes.includes(to.name) && !isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router