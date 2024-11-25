<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Você tem certeza que deseja excluir ?</h3>
        <p>Esta ação não pode ser desfeita.</p>
        <div class="modal-buttons">
          <button @click="confirmDelete" class="confirm-btn">Sim, excluir</button>
          <button @click="cancelDelete" class="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  defineProps({
    isVisible: Boolean,
  });

  const emit = defineEmits(['confirm', 'cancel']);
  
  const confirmDelete = () => {
    emit('confirm');
  };
  
  const cancelDelete = () => {
    emit('cancel'); 
  };
</script>
  
<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-around;
  }
  
  .confirm-btn {
    background-color: red;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .cancel-btn {
    background-color: grey;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  