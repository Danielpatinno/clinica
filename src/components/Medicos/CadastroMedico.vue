<template>
  <div class="home">
    <div class="cadastro-medico">
      <button class="close-btn" @click="closeModal">×</button>
      <h1>Cadastro de Médico</h1>
      <form @submit.prevent="cadastrarMedico">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input id="nome" v-model="medico.nome" type="text" required />
        </div>
        <div class="form-group">
          <label for="conselho">Conselho:</label>
          <input id="conselho" v-model="medico.conselho" type="text" required />
        </div>
        <div class="form-group">
          <label for="estado">Estado:</label>
          <input id="estado" v-model="medico.estado" type="text" required />
        </div>
        <button type="submit" class="submit-btn">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useAddMedic } from '../../composobles/useAddMedic';

  const medico = ref({
    nome: '',
    conselho: '',
    estado: ''
  });

  const emit = defineEmits(['close', 'novoMedico']);
  const { mutate } = useAddMedic();

  const cadastrarMedico = async () => {
    emit('novoMedico', { ...medico.value });
    emit('close');

    try {
      await mutate(medico.value);
    } catch (error) {
      console.error('Erro ao cadastrar médico:', error);
    }
  };

  const closeModal = () => {
    emit('close');
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
  }
  
  .cadastro-medico {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #e6daf5;
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
  
  .close-btn:hover {
    color: #e74c3c;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #4f4f4f;
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
    padding: 10px;
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
  