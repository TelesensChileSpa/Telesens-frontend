<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: 'default'
});

const hexItems = ref([
  { title: 'Inicio' },
  { title: 'Perfil' },
  { title: 'Estadísticas' },
  { title: 'Reportes' },
  { title: 'Notificaciones' },
  { title: 'Configuración' },
  { title: 'Soporte' },
  { title: 'Contacto' }
]);
</script>

<template>
  <!-- Contenido principal -->
  <main class="flex-1 flex flex-col items-center justify-center px-4">
    <h1 class="text-3xl sm:text-4xl font-bold mb-6 text-[#4CAF50] dark:text-[#A5D6A7] text-center">
      Bienvenido a Telesens
    </h1>

    <!-- Grid de hexágonos -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div v-for="(item, index) in hexItems" :key="index"
        class="relative w-24 h-24 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md transition-transform hover:scale-105"
        style="clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);">
        <span class="text-center text-sm font-medium">{{ item.title }}</span>
      </div>
    </div>
  </main>
</template>
