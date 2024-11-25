<template>
  <div class="container">
    <div class="navContainer">
      <h2>Consultas Agendadas</h2>
      <button @click="openModalCadastroConsulta" class="btn-novo">Nova Consulta</button>
    </div>

    <div v-if="isLoading" class="loading">Agendando...</div>

    <div class="consultas-grid">
      <div v-for="consulta in consultas" :key="consulta.id" class="grid-item">
        <p><strong>Paciente:</strong> {{ getPacienteNameByid(consulta.paciente_id) }}</p>
        <p><strong>Dia:</strong> {{ getAgendaById(consulta.agenda_id)?.diaSemana }}</p>
        <p><strong>Horário:</strong> {{ formatTime(getAgendaById(consulta.agenda_id)?.horarioInicio) }}</p>
        <p><strong>Médico:</strong> {{ getMedicoNomeById(getAgendaById(consulta.agenda_id)?.medicoId) }}</p>
        <button @click="openModalDelete(consulta.id)" class="btnDelete">DELETAR</button>
      </div>
    </div>

    <CadastroConsulta v-if="modalCadastro.isVisible.value" @close="closeModalCadastroConsulta" @novaConsulta="adicionarConsulta" />
    <ConfirmDelete :isVisible="modalDelete.isVisible.value" @cancel="closeModalDelete" @confirm="deletarConsulta" />
    <AlertBanner :isAlertVisible="isAlertVisible" color="success" :text="alertText" @update:isAlertVisible="isAlertVisible = $event" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useGetAgenda } from '../composobles/useGetAgenda';
import { useGetPaciente } from '../composobles/useGetPaciente';
import { useGetMedic } from '../composobles/useGetMedic';
import { useFormatTime } from '../composobles/useFormatTime';
import { useGetConsultas } from '../composobles/useGetConsultas';
import { useDeleteConsulta } from '../composobles/useDeleteConsulta';
import { useModal } from '../composobles/useModal';
import { useAlert } from '../composobles/useAlert';

import CadastroConsulta from '../components/Consulta/CadastroConsulta.vue';
import ConfirmDelete from '../components/common/ConfirmDelete.vue';
import AlertBanner from '../components/common/AlertBanner.vue';

const { data: agendas } = useGetAgenda();
const { data: pacientes } = useGetPaciente();
const { data: medicos } = useGetMedic();
const { formatTime } = useFormatTime();
const { isAlertVisible, alertText } = useAlert();
const { data: consults, refetch } = useGetConsultas();
const { mutate } = useDeleteConsulta();
const modalCadastro = useModal();
const modalDelete = useModal();

const consultas = ref([]);
const isLoading = ref(false);
const selectConsultaId = ref('');

watchEffect(() => (consultas.value = Array.isArray(consults.value) ? consults.value : []));

const openModalCadastroConsulta = modalCadastro.openModal;
const closeModalCadastroConsulta = modalCadastro.closeModal;

const openModalDelete = (consultaId) => {
  modalDelete.openModal();
  selectConsultaId.value = consultaId;
};

const closeModalDelete = () => {
  modalDelete.closeModal();
  selectConsultaId.value = null;
};

const getAgendaById = (id) => agendas.value.find((agenda) => agenda.id === id) || {};
const getPacienteNameByid = (id) => pacientes.value.find((p) => p.id === id)?.nome || 'Não encontrado';
const getMedicoNomeById = (id) => medicos.value.find((m) => m.id === id)?.nome || 'Não encontrado';

const deletarConsulta = () => {
  mutate({ consultaId: selectConsultaId.value }, {
    onSuccess: () => {
      consultas.value = consultas.value.filter((c) => c.id !== selectConsultaId.value);
      closeModalDelete()
      alertText.value = 'Consulta cancelada!';
      isAlertVisible.value = true;
      setTimeout(() => (isAlertVisible.value = false), 2000);
    }
  });
};

const adicionarConsulta = async (novaConsulta) => {
  consultas.value.push(novaConsulta);
  isLoading.value = true;
  setTimeout(async () => {    
      await refetch();
      isLoading.value = false;
      alertText.value = 'Consulta marcada!';
      isAlertVisible.value = true;

      setTimeout(() => {
        isAlertVisible.value = false;
      }, 2000);
    }, 2000);
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 44px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.navContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-novo, .btnDelete {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-novo {
  background: #6200ea;
  color: white;
  transition: 0.3s;
}

.btn-novo:hover {
  background: #4a00b4;
}

.btnDelete {
  background: #d10a1b;
  color: white;
}

.btnDelete:hover {
  background: #b50a1a;
}

.consultas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.grid-item {
  padding: 10px;
  background: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
