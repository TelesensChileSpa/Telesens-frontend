<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useUsers } from '~/composables/useUsers'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const { users, fetchUsers, loading, error } = useUsers()
const { isAuthenticated, logout } = useAuthStore()  // Ahora también extraemos logout
const router = useRouter()

// Computed para mantener la autenticación reactiva
const isUserAuthenticated = computed(() => isAuthenticated)

onMounted(() => {
  console.log('onMounted called')
  if (isUserAuthenticated.value) {
    console.log('User is authenticated, fetching users...')
    fetchUsers() // Solo llamamos a la API si el usuario está autenticado
  } else {
    console.log('User is not authenticated, redirecting to login')
    router.push('/login') // Redirigir a login si no está autenticado
  }
})

// Redirigir si hay un error al obtener los usuarios
watch(error, (newError) => {
  if (newError) {
    console.log('Error occurred: ', newError)
    router.push('/login')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <!-- Botón de logout -->
    <div class="flex justify-end mb-4">
      <button @click="logout" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none">
        Logout
      </button>
    </div>

    <h1 class="text-3xl font-bold text-center mb-6">Lista de Usuarios</h1>

    <div v-if="loading" class="text-center text-gray-600" role="status" aria-live="polite">
      Cargando...
    </div>

    <div v-else>
      <div v-if="error" class="text-center text-red-500 mb-4" role="alert">
        {{ error }}
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Correo</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Rut</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Usuario</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Dirección</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Teléfono</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Roles</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Activo</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Creado</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Actualizado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id" class="hover:bg-gray-100">
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.nombre }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.correo }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.rut || 'No disponible' }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.usuario }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.direccion || 'No disponible' }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.telefono || 'No disponible' }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">
                <span v-for="(role, index) in user.roles" :key="index" class="block">{{ role }}</span>
              </td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.activo ? 'Sí' : 'No' }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.creado }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800">{{ user.actualizado }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
