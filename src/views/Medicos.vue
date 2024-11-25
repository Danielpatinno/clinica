<template>
  <div class="container">
    <div class="navContainer">
      <p>Lista de Médicos cadastrado</p>
      <button @click="openModalCadastroMedico" class="newMedicoButton">
        Novo Médico
      </button>
    </div>

    <table class="medicosTable">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Estado</th>
          <th>Conselho</th>
          <th class="thActions"></th>
        </tr>
      </thead>
      <tbody v-if="!isLoading" >
        <tr v-for="medico in medicos" :key="medico.id">
          <td>{{ medico.nome }}</td>
          <td>{{ medico.estado }}</td>
          <td>{{ medico.conselho }}</td>
          <td><Button @click="openModalDelete(medico.id)" class="btnDelete">DELETAR</Button></td>
        </tr>
      </tbody>
    </table>

    <div v-if="isLoading" class="loading">Adicionando...</div>
    
    <CadastroMedico 
      v-if="modalCadastro.isVisible.value" 
      @close="closeModalCadastroMedico" 
      @novoMedico="adicionarMedico"
    />

    <ConfirmDelete 
      :isVisible="modalDelete.isVisible.value"
      @cancel="closeModalDelete"
      @confirm="deletarMedico"
    />

    <AlertBanner 
      :isAlertVisible="isAlertVisible"
      color="success"
      :text="alertText"
      @update:isAlertVisible="isAlertVisible = $event"
    />
  </div>
</template>

<script setup>
  import { ref, watchEffect } from 'vue';

  import { useAlert } from '../composobles/useAlert';
  import { useModal } from '../composobles/useModal';
  import { useDeleteMedico } from '../composobles/useDeleteMedico';
  import { useGetMedic } from '../composobles/useGetMedic';

  import CadastroMedico from '../components/Medicos/CadastroMedico.vue';
  import ConfirmDelete from '../components/common/ConfirmDelete.vue';
  import AlertBanner from '../components/common/AlertBanner.vue';

  const { data, refetch } = useGetMedic();
  const { mutate } = useDeleteMedico();
  const { alertText, isAlertVisible } = useAlert();
  const modalCadastro = useModal();
  const modalDelete = useModal();

  const selectedMedicoId = ref('');
  const isLoading = ref(false);
  const medicos = ref([]);

  watchEffect(() => {
    if (Array.isArray(data.value)) {
      medicos.value = data.value;
    } else {
      console.error('Erro: Dados de médicos não são um array.', data.value);
    }
  });

  const openModalCadastroMedico = modalCadastro.openModal;
  const closeModalCadastroMedico = modalCadastro.closeModal;

  const openModalDelete = (medicoId) => {
    modalDelete.openModal();
    selectedMedicoId.value = medicoId;
  };

  const closeModalDelete = () => {
    modalDelete.closeModal();
    selectedMedicoId.value = null;
  };

  const deletarMedico = () => {
    mutate(
      { medicoId: selectedMedicoId.value },
      {
        onSuccess: () => {
          modalDelete.closeModal();
          medicos.value = medicos.value.filter(
            (medico) => medico.id !== selectedMedicoId.value
          );

          alertText.value = 'Médico deletado!';
          isAlertVisible.value = true;

          setTimeout(() => {
            isAlertVisible.value = false;
          }, 2000);
        }
      }
    );
  };

  const adicionarMedico = (novoMedico) => {
    medicos.value.push(novoMedico);

    isLoading.value = true;

    setTimeout(async () => {
      await refetch();
      isLoading.value = false;

      alertText.value = 'Médico cadastrado com sucesso!';
      isAlertVisible.value = true;

      setTimeout(() => {
        isAlertVisible.value = false;
      }, 2000);
    }, 2000);
  };
</script>

<style scoped>
  .container {
    padding: 20px;
    font-family: Arial, sans-serif;
    margin-top: 40px;
  }

  .loading {
    text-align: center;
    font-size: 20px;
    color: gray;
  }

  .navContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .navContainer p {
    font-size: 20px;
  }

  .newMedicoButton {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #820AD1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .newMedicoButton:hover {
    background-color: #820AD1;
  }

  .medicosTable {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .medicosTable th,
  .medicosTable td {
    text-align: left;
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
  }

  .medicosTable .thActions {
    width: 1%;
  }

  .btnDelete {
    padding: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    background-color: #d10a1b;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .btnDelete:hover {
    background-color: #d10a1bc2;
  }

  .medicosTable th {
    background-color: #820AD1;
    color: #fff;
    font-weight: bold;
  }

  .medicosTable tbody tr:hover {
    background-color: #f2f2f2;
  }
</style>
