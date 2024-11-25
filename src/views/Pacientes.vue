<template>
  <div class="home">
    <div class="navContainer">
      <p>Lista de Pacientes</p>
      <button @click="openModalCadastroPaciente" class="btn-novo">Novo Paciente</button>
    </div>

    <div v-if="isLoading" class="loading">Adicionando...</div>

    <TablePacientes :pacientes="pacientes" @delete="openModalDelete" />
    <AlertBanner :isAlertVisible="isAlertVisible" color="success" :text="alertText" @update:isAlertVisible="isAlertVisible = $event"/>
    <ConfirmDelete :isVisible="modalDelete.isVisible.value" @cancel="closeModalDelete" @confirm="deletarPaciente" />
    <CadastroPaciente v-if="modalCadastro.isVisible.value" @close="closeModalCadastroPaciente" @novoPaciente="adicionarPaciente"/>
  </div>
</template>
<script setup>
  import { ref, watchEffect } from "vue";

  import { useGetPaciente } from "../composobles/useGetPaciente";
  import { useDeletePaciente } from "../composobles/useDeletePaciente";
  import { useAlert } from "../composobles/useAlert";
  import { useModal } from "../composobles/useModal";

  import ConfirmDelete from "../components/common/ConfirmDelete.vue";
  import AlertBanner from '../components/common/AlertBanner.vue';
  import TablePacientes from "../components/Pacientes/TablePacientes.vue";
  import CadastroPaciente from "../components/Pacientes/CadastroPaciente.vue";

  const { isAlertVisible, alertText } = useAlert();
  const { data, refetch } = useGetPaciente()
  const { mutate } = useDeletePaciente();
  const modalCadastro = useModal();
  const modalDelete = useModal();

  const isLoading = ref(false);
  const selectPacienteId = ref('');
  const pacientes = ref([])

  watchEffect(() => {
    if (Array.isArray(data.value)) {
      pacientes.value = data.value;
    } else {
      pacientes.value = [];
    }
  });

  const openModalCadastroPaciente = modalCadastro.openModal;
  const closeModalCadastroPaciente = modalCadastro.closeModal;

  const openModalDelete = (pacienteId) => {
    modalDelete.openModal();
    selectPacienteId.value = pacienteId;
  };

  const closeModalDelete = () => {
    modalDelete.closeModal();
    selectPacienteId.value = null;
  };

  const deletarPaciente = () => {
    mutate(
      { pacienteId: selectPacienteId.value },
      {
        onSuccess: () => {
          modalDelete.closeModal();
          pacientes.value = pacientes.value.filter(
            (paciente) => paciente.id !== selectPacienteId.value
          );

          alertText.value = 'Paciente deletado!';
          isAlertVisible.value = true;

          setTimeout(() => {
            isAlertVisible.value = false;
          }, 2000);
        }
      }
    );
  };

  const adicionarPaciente = (novoPaciente) => {
    pacientes.value.push(novoPaciente);
    isLoading.value = true;

    setTimeout(async () => {    
      await refetch();
      isLoading.value = false;

      alertText.value = 'Paciente cadastrado!';
      isAlertVisible.value = true;

      setTimeout(() => {
        isAlertVisible.value = false;
      }, 2000);
    }, 2000);
  };
</script>

<style scoped>
  .home {
    font-family: Arial, sans-serif;
    padding: 20px;
    margin-top: 44px;
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

  .btn-novo {
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

  .btn-novo:hover {
    background-color: #722bb5;
  }

  .cadastro-paciente {
    margin-top: 20px;
  }

  .cadastro-paciente h1 {
    text-align: center;
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

  .thActions {
    width: 1%;
  }
</style>
