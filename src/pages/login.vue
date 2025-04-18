<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';
import { useTheme } from '~/composables/useTheme';
import { Sun, Moon, Eye, EyeOff, User, Lock, LogIn } from '~/composables/useIcons';
import { vAutoAnimate } from '@formkit/auto-animate';

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
    router.push('/');
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

    <!-- Caja de login con animación -->
    <div ref="formRef" v-auto-animate
      class="w-full max-w-xs sm:max-w-sm md:max-w-sm p-3 sm:p-4 space-y-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-xl border-2"
      :style="{ 'border-color': '#4CAF50' }">

      <!-- Logo -->
      <div class="flex justify-center mb-4">
        <img
          :src="isDarkMode ? 'https://res.cloudinary.com/dobkjiqyn/image/upload/v1743895141/Logo_Blanco_Sin_Sub_riptvs.png' : 'https://res.cloudinary.com/dobkjiqyn/image/upload/v1743803502/icon_rjjvfl.png'"
          alt="Logo" class="h-36 w-auto" loading="eager" decoding="async" />
      </div>

      <!-- Línea divisoria -->
      <div class="border-t border-[#4CAF50] opacity-50 mx-4" style="height: 1px; margin: 12px 0;"></div>

      <!-- Formulario de inicio de sesión -->
      <div class="space-y-6">
        <div class="relative">
          <label for="usuario" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Usuario o correo
          </label>
          <div class="relative">
            <!-- Icono de usuario dentro del input -->
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300">
              <User class="w-5 h-5" />
            </div>
            <input id="usuario" v-model="usuario" type="text" placeholder="Ingrese su usuario o correo"
              aria-label="Usuario" :aria-invalid="errorMessage ? 'true' : 'false'"
              class="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border border-[#4CAF50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder-gray-400 transition-all duration-200 ease-in-out" />
          </div>
        </div>

        <div class="relative">
          <label for="contraseña" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contraseña
          </label>
          <div class="relative">
            <!-- Icono de candado dentro del input -->
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300">
              <Lock class="w-5 h-5" />
            </div>
            <input :type="showPassword ? 'text' : 'password'" id="contraseña" v-model="contraseña"
              placeholder="Ingrese su contraseña" aria-label="Contraseña"
              :aria-invalid="errorMessage ? 'true' : 'false'"
              class="w-full px-4 py-2 pl-10 pr-10 bg-gray-50 dark:bg-gray-700 text-black dark:text-white border border-[#4CAF50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder-gray-400 transition-all duration-200 ease-in-out" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-[#4CAF50] focus:outline-none">
              <span v-if="showPassword">
                <EyeOff class="w-6 h-6" />
              </span>
              <span v-else>
                <Eye class="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <button @click="handleLogin" :disabled="isLoading"
        class="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#4CAF50] via-[#388E3C] to-[#2C6B2F] hover:from-[#388E3C] hover:to-[#4CAF50] focus:outline-none disabled:opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2">
        <LogIn class="w-5 h-5" />
        <span>{{ isLoading ? 'Cargando...' : 'Acceder' }}</span>
      </button>

      <p v-if="errorMessage" class="text-center text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>
