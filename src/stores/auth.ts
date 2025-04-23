// stores/auth.ts
import { defineStore } from 'pinia'
import { useCookie, useRuntimeConfig } from '#app'
import mitt from 'mitt'

type Events = {
  'token-ready': string
  'logout': void
}

const emitter = mitt<Events>()

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const cookie = useCookie<string | null>('token', {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  const token = ref<string | null>(cookie.value ?? null)
  const isAuthenticated = computed(() => !!token.value)

  function emitEvents(val: string | null) {
    if (val) {
      emitter.emit('token-ready', val)
    } else {
      emitter.emit('logout')
    }
  }

  async function login(credentials: { usuario: string; contraseña: string }) {
    try {
      const API_URL = `${config.public.apiBase}/api`
      const { accessToken } = await $fetch<{ accessToken: string }>(`${API_URL}/auth/login`, {
        method: 'POST',
        body: credentials,
        credentials: 'include',
      })

      if (!accessToken) throw new Error('Token de acceso no recibido')

      token.value = accessToken
      cookie.value = accessToken
      emitEvents(accessToken)
    } catch (error: any) {
      throw new Error(error?.message || 'Error al iniciar sesión')
    }
  }

  function logout() {
    token.value = null
    cookie.value = null
    emitEvents(null)
    navigateTo('/login')
  }

  function initAuth() {
    if (cookie.value) {
      token.value = cookie.value
      emitEvents(token.value)
    }
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
    initAuth,
    onTokenReady: (cb: (token: string) => void) => emitter.on('token-ready', cb),
    onLogout: (cb: () => void) => emitter.on('logout', cb),
  }
})