<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

const usuario = ref('');
const contraseña = ref('');
const { login } = useAuth();
const router = useRouter();
const isLoading = ref(false);
const errorMessage = ref('');

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
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-[#05E856] to-black">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl border-2" style="border-color: #05E856;">
      <!-- Logo ajustado -->
      <div class="flex justify-center mb-6">
        <img src="/icon.png" alt="Logo" class="h-42 w-auto">
      </div>

      <!-- Formulario -->
      <div class="space-y-6">
        <input v-model="usuario" type="text" placeholder="Usuario" aria-label="Usuario"
          :aria-invalid="errorMessage ? 'true' : 'false'"
          class="w-full px-5 py-3 bg-gray-50 text-black border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
        <input v-model="contraseña" type="password" placeholder="Contraseña" aria-label="Contraseña"
          :aria-invalid="errorMessage ? 'true' : 'false'"
          class="w-full px-5 py-3 bg-gray-50 text-black border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
      </div>

      <!-- Botón -->
      <button @click="handleLogin" :disabled="isLoading"
        class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none disabled:opacity-50">
        {{ isLoading ? 'Cargando...' : 'Acceder' }}
      </button>

      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="text-center text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>
