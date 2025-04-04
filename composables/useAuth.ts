import { computed } from 'vue';
import { useCookie, useRuntimeConfig, navigateTo } from '#app';

export function useAuth() {
    const token = useCookie<string | null>('token', {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    const isAuthenticated = computed(() => !!token.value);

    const login = async (credentials: { usuario: string; contraseña: string }) => {
        try {
            const API_URL = useRuntimeConfig().public.API_URL;
            const { accessToken } = await $fetch<{ accessToken: string }>(`${API_URL}/auth/login`, {
                method: 'POST',
                body: credentials,
            });

            token.value = accessToken;
            navigateTo('/users');
        } catch (error: any) {
            throw new Error(error?.message || 'Error al iniciar sesión');
        }
    };

    const logout = () => {
        token.value = null;
        navigateTo('/login');
    };

    return { token, login, logout, isAuthenticated };
}
