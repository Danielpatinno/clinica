<template>
    <div class="home">
      <div class="cadastro-paciente">
        <button class="close-btn" @click="closeModal">×</button>
        <h1>Cadastro de Paciente</h1>
        <form @submit.prevent="cadastrarPaciente">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input id="nome" v-model="paciente.nome" type="text" required />
          </div>
          <div class="form-group">
            <label for="cpf">CPF:</label>
            <input id="cpf" v-model="paciente.cpf" type="text" required />
          </div>
          <div class="form-group">
            <label for="dataNascimento">Data de Nascimento:</label>
            <input id="dataNascimento" v-model="paciente.data_nascimento" type="date" required />
          </div>
          <div class="form-group">
            <label for="endereco">Endereço:</label>
            <input id="endereco" v-model="paciente.endereco" type="text" required />
          </div>
          <div class="form-group">
            <label for="telefone">Telefone:</label>
            <input id="telefone" v-model="paciente.telefone" type="text" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input id="email" v-model="paciente.email" type="email" required />
          </div>
          <button type="submit" class="submit-btn">Cadastrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAddPaciente } from "../../composobles/useAddPaciente";

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  const paciente = ref({
    nome: "",
    data_nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    cpf:""
  });

  const emit = defineEmits(['close', 'novoPaciente']);
  const { mutate } = useAddPaciente();
  
  const cadastrarPaciente = async () => {
    paciente.value.data_nascimento = formatDate(paciente.value.data_nascimento);

    emit('novoPaciente', { ...paciente.value})
    emit('close')
    try {
      await mutate(paciente.value);
    } catch (error) {
      console.error('Erro ao cadastrar médico:', error);
    }
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
  
  .cadastro-paciente {
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
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
  
  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;
  }
  
  input:focus {
    border-color: #56ccf2;
  }
  
  .submit-btn {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(90deg, #820ad1, #9d27b0);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
  }
  
  .submit-btn:hover {
    background-color: #722bb5;
    transform: scale(1.02);
  }
  </style>
  