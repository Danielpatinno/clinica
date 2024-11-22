<template>
  <div class="container">
    <div class="navContainer">
      <h2 class="title">Consultas Agendadas</h2>
    <button @click="abrirModal" class="btn-novo">Nova Consulta</button>
    </div>

    <CadastroConsulta 
      v-if="modalAberto"
      @close="closeModal"
      @novaConsulta="adcionarConsulta"
    /> 

    <!-- Lista de Consultas em Grid -->
    <div class="consultas-grid">
      <div class="grid">
        <div class="grid-item" v-for="consulta in consultas" :key="consulta.id">
          <p><strong>Paciente:</strong> {{ consulta.pacienteNome }}</p>
          <p><strong>Dia:</strong>  {{ getAgendaById(consulta.agenda_id).dia_semana }}</p>
          <p><strong>Horário:</strong>  {{ getAgendaById(consulta.agenda_id).horario_inicio }}</p>
          <p><strong>Médico:</strong> {{ getMedicoNomeById(getAgendaById(consulta.agenda_id).medico_id) }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watchEffect } from 'vue';
  import { useGetAgenda } from '../composobles/useGetAgenda';
  import { useGetPaciente } from '../composobles/useGetPaciente';
  import { useGetMedic } from '../composobles/useGetMedic';
  import { useAddConsultas } from '../composobles/useAddConsulta';
  import CadastroConsulta from '../components/Consulta/CadastroConsulta.vue';

  import { useGetConsultas } from '../composobles/useGetConsultas';

  const { data:agendas } = useGetAgenda()
  const { data:pacientes } = useGetPaciente()
  const { data:medicos } = useGetMedic()
  const { data:consults } = useGetConsultas()
  const isLoading = ref(false);
  const consultas = ref([])
 
  watchEffect(() => {
    if (Array.isArray(consults.value)) {
      consultas.value = consults.value;
    } else {
      consultas.value = [];
    }
  });

  const modalAberto = ref(false);

  const abrirModal = () => {
    modalAberto.value = true;
  };

  const closeModal = () => {
    modalAberto.value = false;
  };

  const getAgendaById = (agendaId) => {
    const agenda = agendas.value.find((agenda) => agenda.id === agendaId);
    return agenda || null; 
  };

  const getMedicoNomeById = (medicoId) => {
    if (!medicos) return 'Médico Não Encontrado';
    const medico = medicos.value.find(m => m.id === medicoId);
    return medico ? medico.nome : 'Médico Não Encontrado';
  };

  const adcionarConsulta = (novaConsulta) => {
    consultas.value.push(novaConsulta);
    
    isLoading.value = true;

    setTimeout(async () => {
      
      await refetch();

      isLoading.value = false;
    }, 2000);
  };

</script>

<style scoped>
.container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 44px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2, h3 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
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

  .consultas-grid {
    margin-top: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  .grid-item {
    padding: 10px;
    background-color: #f2f2f2;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
</style>
