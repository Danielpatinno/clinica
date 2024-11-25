<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Navbar from './components/common/Navbar.vue'
  const route = useRoute();
</script>

<template>
  <Navbar />

  <router-view></router-view>
</template>

<style scoped>

</style>
