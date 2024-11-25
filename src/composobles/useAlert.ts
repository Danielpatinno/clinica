import { ref } from 'vue';

export function useAlert() {
  const isAlertVisible = ref(false);
  const alertText = ref('');

  const showAlert = (message, duration = 2000) => {
    alertText.value = message;
    isAlertVisible.value = true;

    setTimeout(() => {
      isAlertVisible.value = false;
    }, duration);
  };

  return {
    isAlertVisible,
    alertText,
    showAlert,
  };
}