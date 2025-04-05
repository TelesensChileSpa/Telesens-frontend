<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';
import { useTheme } from '~/composables/useTheme';
import { Sun, Moon, Eye, EyeOff } from '~/composables/useIcons';

definePageMeta({
  layout: 'auth',
});

const usuario = ref('');
const contraseña = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const { login } = useAuth();
const router = useRouter();

const { isDarkMode, toggleTheme, initTheme } = useTheme();

onMounted(() => {
  initTheme();
});

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  if (!usuario.value || !contraseña.value) {
    errorMessage.value = 'Por favor, complete todos los campos.';
    isLoading.value = false;
    return;
  }

  try {
    await login({ usuario: usuario.value, contraseña: contraseña.value });
    router.push('/users');
  } catch (error: any) {
    errorMessage.value = error?.message || 'Credenciales incorrectas';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div :class="{ 'bg-gray-900': isDarkMode, 'bg-[#f2f2f2]': !isDarkMode }"
    class="flex flex-1 items-center justify-center relative w-full overflow-hidden">

    <!-- Botón para cambiar el tema -->
    <button @click="toggleTheme"
      class="absolute top-4 right-4 p-3 bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none">
      <span v-if="isDarkMode">
        <Moon class="w-5 h-5" />
      </span>
      <span v-else>
        <Sun class="w-5 h-5" />
      </span>
    </button>

    <!-- Caja de login -->
    <div
      class="w-full max-w-xs sm:max-w-sm md:max-w-sm p-3 sm:p-4 space-y-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-xl border-2"
      :style="{ 'border-color': '#4CAF50' }">

      <!-- Logo -->
      <div class="flex justify-center mb-4">
        <img
          :src="isDarkMode ? '/Logo_Blanco_Sin_Sub.png' : 'https://res.cloudinary.com/dobkjiqyn/image/upload/v1743803502/icon_rjjvfl.png'"
          alt="Logo" class="h-36 w-auto" loading="eager" decoding="async" />
      </div>

      <!-- Línea divisoria -->
      <div class="border-t border-[#4CAF50] opacity-50 mx-4" style="height: 1px; margin: 12px 0;"></div>

      <!-- Formulario de inicio de sesión -->
      <div class="space-y-6">
        <div>
          <label for="usuario" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Usuario o correo
          </label>
          <input id="usuario" v-model="usuario" type="text" placeholder="Ingrese su usuario o correo"
            aria-label="Usuario" :aria-invalid="errorMessage ? 'true' : 'false'"
            class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border border-[#4CAF50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder-gray-400" />
        </div>

        <!-- Input de contraseña con botón para mostrar/ocultar -->
        <div class="relative flex items-center">
          <label for="contraseña" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contraseña
          </label>
          <input :type="showPassword ? 'text' : 'password'" id="contraseña" v-model="contraseña"
            placeholder="Ingrese su contraseña" aria-label="Contraseña" :aria-invalid="errorMessage ? 'true' : 'false'"
            class="w-full px-4 py-2 pr-10 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border border-[#4CAF50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder-gray-400" />

          <!-- Botón para mostrar/ocultar la contraseña -->
          <button type="button" @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-[#4CAF50] focus:outline-none">
            <span v-if="showPassword">
              <EyeOff class="w-6 h-6" /> <!-- Ícono para ocultar -->
            </span>
            <span v-else>
              <Eye class="w-6 h-6" /> <!-- Ícono para mostrar -->
            </span>
          </button>
        </div>
      </div>

      <!-- Botón para acceder -->
      <button @click="handleLogin" :disabled="isLoading"
        class="w-full py-2 bg-[#4CAF50] text-white font-semibold rounded-lg hover:bg-[#388E3C] focus:outline-none disabled:opacity-50">
        {{ isLoading ? 'Cargando...' : 'Acceder' }}
      </button>

      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="text-center text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>
