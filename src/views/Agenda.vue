<template>
  <div class="container">
    <div class="navContainer">
      <h2 class="title">Cadastro de Agenda</h2>
      <button class="btn-novo" @click="openModalCadastroAgenda">Nova Agenda</button>
    </div>

    <CadastroAgenda 
      v-if="modalCadastro.isVisible.value" 
      @close="closeModalCadastroAgenda" 
      @novaAgenda="adicionarAgenda"
    />

    <AlertBanner 
      :isAlertVisible.sync="isAlertVisible"
      color="success"
      :text="alertText"
    />

    <ConfirmDelete 
      :is-visible="showModalDelete"
      @cancel="closeModalDelete"
      @confirm="deleteAgenda"
    />

    <div class="agenda-list">
      <div v-for="medico in medicos" :key="medico.id" class="medico-item">
        <h4>{{ medico.nome }}</h4>
        <div v-if="agendasPorMedico[medico.id] && agendasPorMedico[medico.id].length">
          <ul>
            <li 
              v-for="agenda in agendasPorMedico[medico.id]" :key="agenda.id" 
              :class="{'ocupado': agenda.ocupado, 'disponivel': !agenda.ocupado}"
            >
              <strong>{{ agenda.diaSemana }}</strong> 
              - {{ formatTime(agenda.horarioInicio) }} 
              - {{ agenda.ocupado ? 'Ocupado' : 'Disponível' }}
              <button @click="openModalDelete(agenda.id)" >X</button>
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
  import CadastroAgenda from '../components/Agenda/CadastroAgenda.vue';
  import AlertBanner from '../components/common/AlertBanner.vue';

  import { useFormatTime } from '../composobles/useFormatTime';
  import { useGetMedic } from '../composobles/useGetMedic';
  import { useGetAgenda } from '../composobles/useGetAgenda';
  import { useDeleteAgenda } from '../composobles/useDeleteAgenda';
  import { useAlert } from '../composobles/useAlert';
  import { useModal } from '../composobles/useModal';
  import ConfirmDelete from '../components/common/ConfirmDelete.vue';

  const selectAgendaId = ref('');
  const agendasFeitas = ref([]);
  const loading = ref(false);
  const modalCadastro = useModal();
  const showModalDelete = ref(false)

  const { formatTime } = useFormatTime();
  const { data: medicos } = useGetMedic();
  const { data: agendas, refetch } = useGetAgenda();
  const { mutate } = useDeleteAgenda();
  const { isAlertVisible, alertText } = useAlert();

  watchEffect(() => {
    agendasFeitas.value = Array.isArray(agendas.value) ? agendas.value : [];
  });

  const openModalCadastroAgenda = modalCadastro.openModal;
  const closeModalCadastroAgenda = modalCadastro.closeModal;

  const openModalDelete = (agendaId) => {
    showModalDelete.value = true;
    selectAgendaId.value = agendaId;
  };

  const closeModalDelete = () => {
    showModalDelete.value = false;
    selectAgendaId.value = null;
  };

  const deleteAgenda = () => {
    mutate(
      { agendaId: selectAgendaId.value },
      {
        onSuccess: () => {
          showModalDelete.value = false;
          agendasFeitas.value = agendasFeitas.value.filter(
            (agenda) => agenda.id !== selectAgendaId.value
          );
          alertText.value = 'Agenda cancelada!';
          isAlertVisible.value = true;
          setTimeout(() => (isAlertVisible.value = false), 2000);
        },
      }
    );
  };

  const adicionarAgenda = (novaAgenda) => {
    agendasFeitas.value.push(novaAgenda);
    loading.value = true;
    setTimeout(async () => {
      await refetch();
      loading.value = false;
      alertText.value = 'Agenda adicionada!';
      isAlertVisible.value = true;
      setTimeout(() => (isAlertVisible.value = false), 2000);
    }, 2000);
  };

  const agendasPorMedico = computed(() =>
    agendasFeitas.value.reduce((agrupadas, agendaItem) => {
      if (!agrupadas[agendaItem.medicoId]) agrupadas[agendaItem.medicoId] = [];
      agrupadas[agendaItem.medicoId].push(agendaItem);
      return agrupadas;
    }, {})
  );
</script>


<style scoped>
  .container {
    max-width: 900px;
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

  h3 {
    font-size: 22px;
    margin-bottom: 15px;
    text-align: center;
    color: #4a4a4a;
  }

  .agenda-list {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .medico-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    width: 300px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 20px;
    justify-content: space-around;
  }

  .medico-item h4 {
    font-size: 18px;
    border-bottom:2px solid rgba(0, 0, 0, 0.1) ;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 5px;
    color: #333;
  }

  .medico-item ul {
    list-style-type: none;
    padding: 0;
  }

  .medico-item li {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }

  .medico-item li strong {
    flex: 1;
    text-align: left;
    color: #6200ea;
  }
  .medico-item li span {
    flex: 2; 
    text-align: center; 
  }

  .medico-item li button {
    color: white;
    background-color: red;
    border: none;
    border-radius: 50%;
    margin-left: 5px;
    padding: 4px 8px;
    cursor: pointer;
    text-align: center;
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }


  .ocupado {
    font-size: 16px;
    color: #555;
    margin: 8px 0;
    padding: 8px;
    border-left: 4px solid #6200ea;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    color: red; 
  }

  .disponivel {
    font-size: 16px;
    color: #555;
    margin: 8px 0;
    padding: 8px;
    border-left: 4px solid #6200ea;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    color: green;
  }


</style>
