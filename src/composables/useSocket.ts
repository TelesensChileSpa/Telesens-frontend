import { io, Socket } from 'socket.io-client'
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/stores/auth'
import type { ServerToClientEvents, ClientToServerEvents } from '~/interfaces/socket.user.interface'

const socket = ref<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
const isConnected = ref(false)
const userId = ref<string | null>(null)
let isSocketConnected = false

export function useSocket() {
  const auth = useAuthStore()
  const { public: { apiBase } } = useRuntimeConfig()

  // Función para conectar al socket
  function connect(token: string) {
    if (socket.value || !token || isSocketConnected) return

    socket.value = io(`${apiBase}/ws-auth`, {
      transports: ['websocket'],
      auth: { token },
    })

    socket.value.on('userLoggedIn', (data) => {
      userId.value = data.userId || null
      isConnected.value = true
      console.log(`Usuario ${data.userId} conectado correctamente`)
    })

    socket.value.on('userLoggedOut', (data) => {
      userId.value = null
      isConnected.value = false
      console.log(`🚪 Usuario desconectado vía socket: ${data.userId}`)
    })

    socket.value.on('connect_error', (err) => {
      console.error('Error de conexión:', err)
      isConnected.value = false
      isSocketConnected = false
    })

    socket.value.on('disconnect', (reason) => {
      console.warn('Socket desconectado:', reason)
      isConnected.value = false
      isSocketConnected = false
    })

    isSocketConnected = true
  }

  // Función para desconectar el socket
  function disconnect() {
    if (!socket.value) return
    socket.value.disconnect()
    socket.value = null
    isConnected.value = false
    userId.value = null
    isSocketConnected = false
  }

  // Conexión automática cuando se monta el componente
  onMounted(() => {
    const token = auth.getToken()

    if (token && typeof token === 'string') {
      connect(token)
    }

    // Reconexión al volver a estar online
    window.addEventListener('online', () => {
      const latestToken = auth.getToken()
      if (latestToken && typeof latestToken === 'string' && !isConnected.value) {
        connect(latestToken)
      }
    })
  })

  return {
    socket,
    isConnected,
    userId,
    connect,
    disconnect,
  }
}