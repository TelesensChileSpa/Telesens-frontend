import { computed, watch, onMounted } from 'vue'
import { useCookie, useRuntimeConfig, navigateTo } from '#app'
import mitt from 'mitt'

type Events = {
    'token-ready': string
    'logout': void
}

const emitter = mitt<Events>()

export function useAuth() {
    const token = useCookie<string | null>('token', {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })

    const isAuthenticated = computed(() => !!token.value)

    onMounted(() => {
        if (token.value) {
            emitter.emit('token-ready', token.value)
        }
    })

    watch(token, (val) => {
        if (val) {
            emitter.emit('token-ready', val)
        }
    })

    const login = async (credentials: { usuario: string; contraseña: string }) => {
        try {
            const { public: { apiBase } } = useRuntimeConfig()
            const API_URL = `${apiBase}/api`
            const { accessToken } = await $fetch<{ accessToken: string }>(`${API_URL}/auth/login`, {
                method: 'POST',
                body: credentials,
                credentials: 'include',
            })

            if (!accessToken) throw new Error('Token de acceso no recibido')
            token.value = accessToken
        } catch (error: any) {
            throw new Error(error?.message || 'Error al iniciar sesión')
        }
    }

    const logout = () => {
        token.value = null
        useCookie('token').value = null
        emitter.emit('logout')
        navigateTo('/login')
    }

    return {
        token,
        login,
        logout,
        isAuthenticated,
        onTokenReady: (cb: (token: string) => void) => emitter.on('token-ready', cb),
        onLogout: (cb: () => void) => emitter.on('logout', cb),
    }
}
