<!-- src/pages/NotFound.vue -->
<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#388E3C] to-[#1B5E20] text-white">
      <h1 class="text-6xl font-bold">404</h1>
      <p class="text-xl mt-4">¡Página no encontrada!</p>
      <p class="text-md mt-2">Lo sentimos, la página que buscas no está disponible.</p>
      <router-link to="/" class="mt-4 text-lg text-[#FFC107] hover:text-[#FFEB3B]">
        Regresar a la página principal
      </router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  /* Agrega estilos adicionales si lo deseas */
  </style>
  