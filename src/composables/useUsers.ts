import { ref, watchEffect } from 'vue';
import type { User } from '~/interfaces/user.interface';
import { useRuntimeConfig } from '#app';
import { useAuth } from '~/composables/useAuth';
import { navigateTo } from '#app';

export function useUsers() {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const { token, isAuthenticated } = useAuth();
  const { public: { apiBase } } = useRuntimeConfig();
  const API_URL = `${apiBase}/api`;     // ruta REST

  const fetchUsers = async () => {
    if (!isAuthenticated.value || !token.value) {
      console.log('Usuario no autenticado, redirigiendo a login...');
      navigateTo('/login', { replace: true });
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<User[]>(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token.value}` },
        credentials: 'include',
      });
      users.value = response;
    } catch (err: any) {
      console.error('Error fetching users:', err);
      if (err.status === 401) {
        console.log('Token expirado, redirigiendo a login...');
        navigateTo('/login', { replace: true });
      } else {
        error.value = err?.message || 'Error al cargar los usuarios';
      }
    } finally {
      loading.value = false;
    }
  };

  // Ejecutar la verificación y redirección al cargar el composable
  watchEffect(() => {
    if (!isAuthenticated.value || !token.value) {
      console.log('No autenticado, redirigiendo inmediatamente...');
      navigateTo('/login', { replace: true });
    }
  });

  return { users, fetchUsers, loading, error };
}
