<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Home, User, BarChart, FileText, Bell, Settings, LifeBuoy, Mail } from 'lucide-vue-next';

// Acceder al router
const router = useRouter();

// Hexágonos
const hexItems = ref([
  { title: 'INICIO', icon: Home, path: '/' },
  { title: 'PERFIL', icon: User, path: '/perfil' },
  { title: 'ESTADÍSTICAS', icon: BarChart, path: '/estadisticas' },
  { title: 'REPORTES', icon: FileText, path: '/reportes' },
  { title: 'NOTIFICACIONES', icon: Bell, path: '/notificaciones' },
  { title: 'CONFIGURACIÓN', icon: Settings, path: '/configuracion' },
  { title: 'SOPORTE', icon: LifeBuoy, path: '/soporte' },
  { title: 'CONTACTO', icon: Mail, path: '/contacto' }
]);

// Función para navegar al hacer click
const navigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
    <!-- Fila superior (en dispositivos pequeños se ajusta en dos filas) -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
      <div
        v-for="(item, index) in hexItems"
        :key="'item-' + index"
        @click="navigate(item.path)"
        class="cursor-pointer relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex flex-col items-center justify-center rounded-md text-xs font-medium shadow-md
               transition-all duration-300 transform hover:scale-105
               bg-gradient-to-r dark:bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 
               hover:from-[#4CAF50] hover:to-[#388E3C] hover:bg-opacity-50 dark:hover:from-[#4CAF50] dark:hover:to-[#388E3C] dark:hover:bg-opacity-50"
        style="clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);"
      >
        <component :is="item.icon" class="w-8 h-8 mb-2 text-black dark:text-white" />
        <span class="text-black dark:text-white font-sans text-center">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
