import { createRouter, createWebHistory } from 'vue-router'
import Medicos from '../views/Medicos.vue'
import Agenda from '../views/Agenda.vue'
import Consultas from '../views/Consultas.vue'
import Pacientes from '../views/Pacientes.vue'

const routes = [
  {
    path: '/',
    name: 'Medicos',
    component:  Medicos
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda
  },
  {
    path: '/consultas',
    name: 'Consultas',
    component: Consultas
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: Pacientes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router