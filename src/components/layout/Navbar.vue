<template>
    <nav class="navbar">
      <p class="navbar-brand">Clinica Lode</p>
      <div class="navbar-links">
        <router-link to="/" class="nav-link">MÉDICOS</router-link>
        <router-link to="/pacientes" class="nav-link">PACIENTES</router-link>
        <router-link to="/agenda" class="nav-link">AGENDA</router-link>
        <router-link to="/consultas" class="nav-link">CONSULTAS</router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .navbar {
    background-color: #820AD1; /* Cor de fundo roxa */
    color: white; /* Texto em branco */
    height: 60px;
    display: flex;
    align-items: center; /* Centraliza verticalmente o conteúdo */
    justify-content: space-between; /* Se necessário, separa os elementos laterais */
    padding: 0 20px; /* Espaço lateral interno */
    position: fixed; /* Fixa no topo da tela */
    top: 0;
    left: 0;
    width: 100%; /* Ocupa toda a largura da tela */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra discreta */
    z-index: 1000; /* Certifica-se de que esteja acima de outros elementos */
  }
  
  .navbar-links {
    display: flex;
    margin-right: 25px;
    gap: 10px; /* Espaço entre os links */
  }
  
  .nav-link {
    background-color: #ffffff; /* Fundo branco */
    color: #820AD1; /* Texto roxo */
    padding: 10px 20px;
    text-decoration: none; /* Remove o sublinhado */
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .nav-link:hover {
    background-color: #e0e0e0; /* Cor de fundo leve quando o link é hover */
  }
  
  .navbar-brand {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  /* Responsividade para telas menores */
  @media (max-width: 768px) {
    .navbar {
      padding: 0 10px;
    }
  
    .navbar-brand {
      font-size: 16px;
    }
  
    .navbar-links {
      gap: 5px; /* Espaço entre os links menor em telas menores */
    }
  }
  </style>
  