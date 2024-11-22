<template>
  <div class="container">
    <div class="navContainer">
      <h2 class="title">Cadastro de Agenda</h2>
      <button class="btn-novo" @click="openModalCadastroAgenda" >Nova Agenda</button>
    </div>
    
    <CadastroAgenda 
      v-if="showModalCadastroAgenda" 
      @close="closeModalCadastroAgenda" 
      @novaAgenda="adicionarAgenda"
    />

    <div class="agenda-list">
      <h3>Agendas Cadastradas</h3>
      <div v-for="medico in medicos" :key="medico.id" class="medico-item">
        <h4>{{ medico.nome }}</h4>
        <div v-if="agendasPorMedico[medico.id] && agendasPorMedico[medico.id].length">
          <ul>
            <li v-for="agenda in agendasPorMedico[medico.id]" :key="agenda.id">
              <strong>{{ agenda.dia_semana }}</strong> - {{ agenda.horario_inicio }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Sem agendas cadastradas para este médico.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useGetMedic } from '../composobles/useGetMedic';
import { useGetAgenda } from '../composobles/useGetAgenda';
import { useAddAgenda } from '../composobles/useAddAgenda';
import CadastroAgenda from '../components/Agenda/CadastroAgenda.vue';

const showModalCadastroAgenda = ref(false)

const agendasFeitas = ref([]);
const { data: medicos } = useGetMedic();
const { data: agendas, refetch } = useGetAgenda();
const { mutate } = useAddAgenda(); 

const loading = ref(false); 

watchEffect(() => {
  if (Array.isArray(agendas.value)) {
    agendasFeitas.value = agendas.value;
  } else {
    agendasFeitas.value = [];
  }
});

const openModalCadastroAgenda = () => {
  showModalCadastroAgenda.value = true;
};

const closeModalCadastroAgenda = () => {
  showModalCadastroAgenda.value = false;
};

const adicionarAgenda = (novaAgenda) => {
  agendasFeitas.value.push(novaAgenda)

  loading.value = true;

  setTimeout(async () => {
    await refetch();

    loading.value = false
  }, 2000)
}

const agendasPorMedico = computed(() => {
  if (!Array.isArray(agendas.value)) return {};

  return agendasFeitas.value.reduce((agrupadas, agendaItem) => {
    if (!agrupadas[agendaItem.medico_id]) {
      agrupadas[agendaItem.medico_id] = [];
    }
    agrupadas[agendaItem.medico_id].push(agendaItem);
    return agrupadas;
  }, {});
});
</script>


<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 20px;
  }

  .navContainer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    align-items: center;
    height: 40px;
  }

  .btn-novo {
    background-color: #6200ea;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .btn-novo:hover {
    background-color: #4a00b4;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .agenda-list {
    margin-top: 30px;
  }

  .agenda-list h3 {
    font-size: 22px;
    margin-bottom: 15px;
    text-align: center;
    color: #4a4a4a;
  }

  .medico-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 20px;
  }

  .medico-item h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .medico-item ul {
    list-style-type: none;
    padding: 0;
  }

  .medico-item li {
    font-size: 16px;
    color: #555;
    margin: 8px 0;
    padding: 8px;
    border-left: 4px solid #6200ea;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .medico-item li strong {
    color: #6200ea;
  }

  .medico-item p {
    font-size: 16px;
    color: #888;
    text-align: center;
    margin: 10px 0;
    padding: 10px;
    background-color: #f3f3f3;
    border-radius: 4px;
  }
</style>
