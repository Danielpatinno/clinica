import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; // Importa o router
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient();
const app = createApp(App);

app.use(router); // Usa o router
app.mount('#app');
app.use(VueQueryPlugin, { queryClient });