import { ref } from "vue";

export function useModal() {
    const isVisible = ref(false);
    const openModal = () => (isVisible.value = true);
    const closeModal = () => (isVisible.value = false);
  
    return {
      isVisible,
      openModal,
      closeModal,
    };
}