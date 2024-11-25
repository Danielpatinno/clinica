<template>
  <div class="pacientes-table">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Endereço</th>
          <th>Telefone</th>
          <th>Email</th>
          <th class="thActions"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.id">
          <td>{{ paciente.nome }}</td>
          <td>{{ paciente.cpf }}</td>
          <td>{{ paciente.data_nascimento }}</td>
          <td>{{ paciente.endereco }}</td>
          <td>{{ paciente.telefone }}</td>
          <td>{{ paciente.email }}</td>
          <td>
            <button @click="$emit('delete', paciente.id)" class="btnDelete">
            DELETAR
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  defineProps({
    pacientes: Array,
  });
</script>

<style scoped>
  .pacientes-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .pacientes-table th {
    background-color: #820AD1;
    color: #fff;
    font-weight: bold;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    text-align: left;
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
</style>