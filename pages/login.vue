<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'auth',
});

const usuario = ref('');
const contraseña = ref('');
const { login } = useAuth();
const router = useRouter();
const isLoading = ref(false);
const errorMessage = ref('');
const isDarkMode = ref(false);

// Detectar la preferencia de tema al cargar la página: por defecto, tema claro
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
  } else {
    isDarkMode.value = false;
  }
  // Actualizamos el elemento raíz
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// Cambiar el tema y actualizar el elemento raíz
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = ''; // Limpiar error previo

  // Validación básica de campos
  if (!usuario.value || !contraseña.value) {
    errorMessage.value = 'Por favor, complete todos los campos.';
    isLoading.value = false;
    return;
  }

  try {
    await login({ usuario: usuario.value, contraseña: contraseña.value });
    router.push('/users'); // Redirige tras login exitoso
  } catch (error: any) {
    errorMessage.value = error?.message || 'Credenciales incorrectas';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <!-- Contenedor principal: la clase "dark" se aplica globalmente en <html> -->
  <div :class="{ 'bg-gray-900': isDarkMode, 'bg-white': !isDarkMode }"
    class="flex flex-1 items-center justify-center relative w-full overflow-hidden">

    <!-- Botón para cambiar tema, en la esquina superior derecha -->
    <button @click="toggleTheme"
      class="absolute top-4 right-4 p-3 bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none">
      <span v-if="isDarkMode">🌙</span>
      <span v-else>🌞</span>
    </button>

    <!-- Caja de inicio de sesión, aún más pequeña por defecto -->
    <div
      class="w-full max-w-xs sm:max-w-sm md:max-w-sm p-3 sm:p-4 space-y-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-xl border-2"
      :style="{ 'border-color': '#4CAF50' }">

      <!-- Logo ajustado -->
      <div class="flex justify-center mb-4">
        <img src="https://res.cloudinary.com/dobkjiqyn/image/upload/v1743803502/icon_rjjvfl.png" alt="Logo"
          class="h-36 w-auto" loading="eager" decoding="async">
      </div>

      <!-- Línea debajo del logo, más delgada -->
      <div class="border-t border-[#4CAF50] mx-4 mb-4"></div>

      <!-- Formulario -->
      <div class="space-y-6">
        <input v-model="usuario" type="text" placeholder="Usuario" aria-label="Usuario"
          :aria-invalid="errorMessage ? 'true' : 'false'"
          class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border border-[#4CAF50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder-gray-400" />
        <input v-model="contraseña" type="password" placeholder="Contraseña" aria-label="Contraseña"
          :aria-invalid="errorMessage ? 'true' : 'false'"
          class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border border-[#4CAF50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder-gray-400" />
      </div>

      <!-- Botón de acceso -->
      <button @click="handleLogin" :disabled="isLoading"
        class="w-full py-2 bg-[#4CAF50] text-white font-semibold rounded-lg hover:bg-[#388E3C] focus:outline-none disabled:opacity-50">
        {{ isLoading ? 'Cargando...' : 'Acceder' }}
      </button>

      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="text-center text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>
