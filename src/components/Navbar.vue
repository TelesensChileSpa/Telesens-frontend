<script setup lang="ts">
import { ref } from 'vue';
import { vAutoAnimate } from '@formkit/auto-animate';
import ButtonTheme from '~/components/ButtonTheme.vue';
import { User, LogOut } from '~/composables/useIcons';
import { useAuth } from '~/composables/useAuth';

const { logout } = useAuth();

const showProfileMenu = ref(false);

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

const handleLogout = () => {
  logout();
  showProfileMenu.value = false;
};
</script>

<template>
  <nav class="w-full h-16 px-6 flex items-center justify-between shadow-sm transition-colors duration-300 
    bg-gradient-to-r from-[#388E3C] to-[#1B5E20] backdrop-blur-lg bg-opacity-40 relative z-30">

    <!-- Logo a la izquierda -->
    <!-- Logo a la izquierda -->
<div class="flex items-center h-full">
  <img 
    src="https://res.cloudinary.com/dobkjiqyn/image/upload/v1745279295/WAWAW_Mesa_de_trabajo_1_dg5svu.webp" 
    alt="Logo" 
    class="h-full max-h-full object-contain drop-shadow-md dark:hidden" />
    
  <img 
    src="https://res.cloudinary.com/dobkjiqyn/image/upload/v1744161514/icono_web_wxpf7m.webp" 
    alt="Logo"
    class="h-full max-h-full object-contain drop-shadow-md hidden dark:block" />
</div>

    <!-- Título centrado -->
    <div class="absolute left-1/2 transform -translate-x-1/2 
        text-white dark:text-black 
        font-poppins font-bold tracking-wide text-2xl 
        transition-colors duration-500 ease-in-out">
        Telemetría Telesens Chile
    </div>

    <!-- Perfil y cambio de tema -->
    <div class="flex items-center space-x-4 ml-auto">
      <div class="relative" v-auto-animate>
        <!-- Botón perfil -->
        <button @click="toggleProfileMenu"
                class="p-2 rounded-full text-white dark:text-black hover:bg-[#388E3C]/20 transition duration-300 ease-in-out"
                title="Perfil">
          <User class="w-5 h-5" />
        </button>

        <!-- Menú desplegable -->
        <div v-if="showProfileMenu"
             class="absolute top-10 -left-40 w-48 bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg z-50 transition-colors duration-300">
          <ul class="space-y-2 py-2">
            <li>
              <a href="/perfil"
                 class="block px-4 py-2 text-sm hover:bg-[#388E3C] hover:text-white transition">Perfil</a>
            </li>
            <li>
              <button @click="handleLogout"
                      class="block w-full text-left px-4 py-2 text-sm hover:bg-[#388E3C] hover:text-white transition">
                <LogOut class="w-5 h-5 inline-block mr-2" /> Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Botón de cambio de tema -->
      <ButtonTheme />
    </div>
  </nav>
</template>
