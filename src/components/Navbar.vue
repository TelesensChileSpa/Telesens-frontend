<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from '~/composables/useTheme';
import { Moon, Sun, User, LogOut } from '~/composables/useIcons';
import { useAuth } from '~/composables/useAuth'; // Importar useAuth

const { isDarkMode, toggleTheme } = useTheme();
const { logout } = useAuth(); // Desestructurar logout

// Estado para mostrar el menú desplegable
const showProfileMenu = ref(false);

// Función para alternar el estado del menú
const toggleProfileMenu = () => {
    showProfileMenu.value = !showProfileMenu.value;
};

// Función para cerrar sesión
const handleLogout = () => {
    logout(); // Llamar a la función logout de useAuth
    showProfileMenu.value = false;  // Cerrar el menú después de hacer clic en Cerrar sesión
};
</script>

<template>
    <!-- NAVBAR con fondo translúcido y desenfoque -->
    <nav class="w-full h-16 px-6 flex items-center justify-between shadow-md transition-colors duration-300 
        bg-gradient-to-r from-[#388E3C] to-[#1B5E20] backdrop-blur-lg bg-opacity-40">

        <!-- LOGO más grande pero sin cambiar el alto del navbar -->
        <div class="flex items-center h-full">
            <img src="https://res.cloudinary.com/dobkjiqyn/image/upload/v1744161514/icono_web_wxpf7m.webp" alt="Logo"
                class="h-full max-h-full object-contain drop-shadow-md" />
        </div>

        <!-- MENÚ: Texto más grande y fuente moderna, letras negras -->
        <ul class="hidden md:flex space-x-8 text-sm font-semibold text-black">
            <li><a href="/" class="text-lg hover:text-[#388E3C] transition font-poppins">Inicio</a></li>
            <li><a href="/acerca" class="text-lg hover:text-[#388E3C] transition font-poppins">Acerca</a></li>
            <li><a href="/contacto" class="text-lg hover:text-[#388E3C] transition font-poppins">Contacto</a></li>
        </ul>

        <!-- BOTÓN DE CAMBIO DE TEMA Y PERFIL -->
        <div class="flex items-center space-x-4 relative">
            <!-- Botón de perfil -->
            <button @click="toggleProfileMenu" class="p-2 rounded-full text-black hover:bg-[#388E3C]/20 transition"
                title="Perfil">
                <User class="w-5 h-5" />
            </button>

            <!-- Menú desplegable del perfil -->
            <div v-if="showProfileMenu"
                class="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
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

            <!-- Botón de cambio de tema -->
            <button @click="toggleTheme"
                class="p-2 rounded-full bg-gradient-to-r from-[#388E3C] to-[#1B5E20] text-white shadow hover:scale-105 transition-all duration-300"
                title="Cambiar tema">
                <component :is="isDarkMode ? Moon : Sun" class="w-5 h-5 text-black" />
            </button>
        </div>
    </nav>
</template>

<!-- Fuente Poppins -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.font-poppins {
    font-family: 'Poppins', sans-serif;
}
</style>
