<template>
  <div class="home">
    <div class="cadastro-consulta">
        <button class="close-btn" @click="closeModal">×</button>
        <form @submit.prevent="cadastrarConsulta">
        <h1>Nova Consulta</h1>
        <div class="input-group">
            <label for="paciente">Paciente</label>
            <select id="paciente" v-model="consulta.pacienteId" required>
            <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
                {{ paciente.nome }}
            </option>
            </select>
        </div>
        <div class="input-group">
            <label for="agenda">Agenda</label>
            <select id="agenda" v-model="consulta.agendaId" required>
            <option v-for="agenda in agendas" :key="agenda.id" :value="agenda.id">
                {{ getMedicoNomeById(agenda.medico_id) }} -
                {{ agenda.dia_semana }} ás {{ agenda.horario_inicio }} 
            </option>
            </select>
        </div>
        <div class="form-actions">
            <button type="submit">Salvar</button>
        </div>
        </form>
    </div>
  </div>
</template>

<script setup>
  import { useGetMedic } from '../../composobles/useGetMedic';
  import { useGetAgenda } from '../../composobles/useGetAgenda';
  import { useGetPaciente } from '../../composobles/useGetPaciente';
  import { ref } from 'vue';
  import { useAddConsultas } from '../../composobles/useAddConsulta';

  const { data:agendas } = useGetAgenda()
  const { data:pacientes } = useGetPaciente()
  const { data:medicos } = useGetMedic()
  const { mutate } = useAddConsultas(); 

  const emit = defineEmits(['close', 'novaConsulta']);

  const consulta = ref({
    pacienteId: '',
    agendaId: ''
  });

  const cadastrarConsulta = async () => {
    const consultaPayload = {
      paciente_id: parseInt(consulta.value.pacienteId, 10),
      agenda_id: parseInt(consulta.value.agendaId, 10)
    }

    emit('novaConsulta', { ...consultaPayload.value})
    emit('close')
    try {
      await mutate(consultaPayload);
    } catch (error) {
      console.error('Erro ao cadastrar médico:', error);
    }
  };

  const getMedicoNomeById = (medicoId) => {
    if (!medicos.value || !Array.isArray(medicos.value)) {
      return 'Médico Não Encontrado';
    }
    const medico = medicos.value.find(m => m.id === medicoId);
    return medico ? medico.nome : 'Médico Não Encontrado';
  };

  const closeModal = () => {
    emit('close')
  };
</script>

<style scoped>
  .home {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); 
  }
  
  .cadastro-consulta {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #333;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s;
  }

  .input-group {
  margin-bottom: 15px;
}

  .input-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .input-group select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .form-actions button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .form-actions button:hover {
    background-color: #0056b3;
  }
</style>