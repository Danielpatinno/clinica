<template>
  <div class="home">

    <!-- Barra de Busca e Botão Novo Paciente -->
    <div class="navContainer">
      <input type="text" placeholder="Buscar Paciente..." v-model="searchQuery" class="search-input" />
      <button @click="openModalCadastroPaciente" class="btn-novo">Novo Paciente</button>
    </div>

    <div v-if="isLoading" class="loading">Adicionando...</div>

    <!-- Tabela de Pacientes -->
    <div class="pacientes-table">
      <table v-if="!isLoading">
        <thead>
          <tr>
            <th>Nome</th>
            <th>cpf</th>
            <th>Data de Nascimento</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paciente in pacientes" :key="paciente.nome">
            <td>{{ paciente.nome }}</td>
            <td>{{ paciente.cpf }}</td>
            <td>{{ paciente.data_nascimento }}</td>
            <td>{{ paciente.endereco }}</td>
            <td>{{ paciente.telefone }}</td>
            <td>{{ paciente.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <CadastroPaciente       
      v-if="showModalCadastroPaciente" 
      @close="closeModalCadastroPaciente" 
      @novoPaciente="adicionarPaciente"
    />
   
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import CadastroPaciente from "../components/Pacientes/CadastroPaciente.vue";
import { useGetPaciente } from "../composobles/useGetPaciente";

const pacientes = ref([])
const { data, refetch } = useGetPaciente()
const showModalCadastroPaciente = ref(false);
const isLoading = ref(false);

watchEffect(() => {
  if (Array.isArray(data.value)) {
    pacientes.value = data.value;
  } else {
    pacientes.value = [];
  }
});

const searchQuery = ref("");
const filteredPacientes = computed(() => {
  return data.value.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openModalCadastroPaciente = () => {
  showModalCadastroPaciente.value = true;
};

const closeModalCadastroPaciente = () => {
  showModalCadastroPaciente.value = false;
};


const adicionarPaciente = (novoPaciente) => {
  pacientes.value.push(novoPaciente);
  
  isLoading.value = true;

  setTimeout(async () => {
    
    await refetch();

    isLoading.value = false;
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

nav {
  background-color: #820ad1;
  color: white;
  padding: 10px 0;
  text-align: center;
}

.navContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
}

.btn-novo {
  background-color: #820ad1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-novo:hover {
  background-color: #722bb5;
}

.pacientes-table {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tr:hover {
  background-color: #f9f9f9;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
}

.close-modal:hover {
  color: #ff0000;
}

.cadastro-paciente {
  margin-top: 20px;
}

.cadastro-paciente h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

input:focus {
  border-color: #820ad1;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #820ad1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #722bb5;
}
</style>
