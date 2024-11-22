<template>
  <div class="home">
    <div class="cadastro-agenda">
        <button class="close-btn" @click="closeModal">
            X
        </button>
        <h1>Cadastro de Agenda</h1>
        <form @submit.prevent="cadastrarAgenda" class="form">
      <div class="form-group">
        <label for="medico">Médico</label>
        <select
          id="medico"
          v-model="agenda.medicoId"
          required
          class="input"
        >
          <option v-for="medico in data" :key="medico.id" :value="medico.id">
            {{ medico.nome }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="diaSemana">Dia da Semana</label>
        <input
          id="diaSemana"
          v-model="agenda.diaSemana"
          type="text"
          placeholder="Ex: Segunda-feira"
          required
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="hora">Horário</label>
        <input
          id="hora"
          v-model="agenda.hora"
          type="time"
          required
          class="input"
        />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn" :disabled="loading">
          <span v-if="loading">Salvando...</span>
          <span v-else>Salvar</span>
        </button>
      </div>
    </form>
    </div>
  </div>
    
</template>

<script setup>
  import { ref } from 'vue';
  import { useGetMedic } from '../../composobles/useGetMedic';
  import { useAddAgenda } from '../../composobles/useAddAgenda';
  const { data } = useGetMedic();
  const { mutate } = useAddAgenda()

  const emit = defineEmits(['close', 'novaAgenda'])

  const agenda = ref({
    medicoId: null,
    diaSemana: '',
    hora: ''
    });

  const cadastrarAgenda = async () => {
    const agendaPayload = {
      medico_id: parseInt(agenda.value.medicoId, 10),
      dia_semana: agenda.value.diaSemana,
      horario_inicio: agenda.value.hora
    };

    emit('novaAgenda', {...agendaPayload.value})
    emit('close')

    try {
      await mutate(agendaPayload); 
    } catch (error) {
      console.error('Erro ao salvar agenda:', error);
    }  
  }

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

  .cadastro-agenda {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    position: relative; /* Necessário para o posicionamento absoluto do botão de fechar */
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

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .input:focus {
    outline: none;
    border-color: #0066cc;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    padding: 10px 20px;
    background-color: #0066cc;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #005bb5;
  }
</style>