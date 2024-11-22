<template>
  <div class="container">
    <div class="navContainer">
      <input type="text" placeholder="Buscar Médico" class="searchInput" />
      <button @click="openModalCadastro" class="newMedicoButton">
        Novo Médico
      </button>
    </div>

    <CadastroMedico 
      v-if="showModalCadastro" 
      @close="closeModalCadastro" 
      @novoMedico="adicionarMedico"
    />

    <div v-if="isLoading" class="loading">Adicionando...</div>

    <table v-if="!isLoading" class="medicosTable">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Estado</th>
          <th>Conselho</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="medico in medicos" :key="medico.id">
          <td>{{ medico.nome }}</td>
          <td>{{ medico.estado }}</td>
          <td>{{ medico.conselho }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import CadastroMedico from '../components/Medicos/CadastroMedico.vue';
import { useGetMedic } from '../composobles/useGetMedic';

const showModalCadastro = ref(false);
const isLoading = ref(false);

const medicos = ref([]);

const { data, refetch } = useGetMedic();

watchEffect(() => {
  if (Array.isArray(data.value)) {
    medicos.value = data.value;
  } else {
    console.error('Erro: Dados de médicos não são um array.', data.value);
  }
});

const openModalCadastro = () => {
  showModalCadastro.value = true;
};

const closeModalCadastro = () => {
  showModalCadastro.value = false;
};

const adicionarMedico = (novoMedico) => {
  medicos.value.push(novoMedico);
  
  // Ativar o loading
  isLoading.value = true;

  setTimeout(async () => {
    
    await refetch();

    isLoading.value = false;
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
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.searchInput {
  flex: 1;
  max-width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.searchInput:focus {
  border-color: #007bff;
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

.medicosTable th {
  background-color: #820AD1;
  color: #fff;
  font-weight: bold;
}

.medicosTable tbody tr:hover {
  background-color: #f2f2f2;
}
</style>
