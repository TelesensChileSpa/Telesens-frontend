<script setup lang="ts">
import { ref } from 'vue';

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
  <div class="flex-1 flex items-center justify-center px-4 py-6">
    <!-- Grid de hexágonos -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      <div v-for="(item, index) in hexItems" :key="index"
        class="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 
               flex items-center justify-center 
               bg-white dark:bg-gray-800 
               text-gray-800 dark:text-white 
               shadow-md transition-transform hover:scale-105"
        style="clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);">
        <span class="text-center text-sm font-medium">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
