<template>
  <div
    v-if="props.isAlertVisible"
    :class="['fixed-alert', props.color]" 
    role="alert"
    @dismissed="closeAlert"
  >
    <p>
    {{ props.text }}
    </p>
  </div>
</template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    isAlertVisible: boolean;
    color: 'error' | 'success' | 'info' | 'warning';
    text: string | null;
  }>();
  
  const emit = defineEmits(['update:isAlertVisible']);

  function closeAlert() {
    emit('update:isAlertVisible', false); 
  }
</script>
  
  
<style scoped>
  .fixed-alert {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    padding: 10px 20px;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .fixed-alert.success {
    background-color: #4caf50; 
    border: 1px solid #3e8e41;
  }

  .fixed-alert.error {
    background-color: #f44336; 
    border: 1px solid #d32f2f;
  }

  .fixed-alert p {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
  