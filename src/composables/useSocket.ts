// composables/useSockets.ts
import { io, Socket } from 'socket.io-client'
import { ref, onUnmounted, watch } from 'vue'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/stores/auth'

const socket = ref<Socket | null>(null)
const isConnected = ref(false)

export const useSocket = () => {
    const auth = useAuthStore()
    const { public: { apiBase } } = useRuntimeConfig()

    // Conectar al WebSocket con el token del usuario
    const connect = (token: string) => {
        if (!token) return

        // Evitar múltiples conexiones si ya está conectado
        if (socket.value?.connected) return

        const newSocket = io(`${apiBase}/ws-auth`, {
            transports: ['websocket'],
            auth: { token },
        })

        newSocket.on('connect', () => {
            isConnected.value = true
            console.log('🟢 WebSocket conectado')
        })

        newSocket.on('disconnect', (reason) => {
            isConnected.value = false
            console.warn('🔴 WS desconectado:', reason)
        })

        newSocket.on('connect_error', (error) => {
            isConnected.value = false
            console.error('❌ WS Error:', error)
        })

        socket.value = newSocket
    }

    // Conexión automática cuando el token cambia
    watch(
        () => auth.token,
        (newToken) => {
            if (newToken) {
                connect(newToken)
            } else {
                disconnect()  // Desconectar si no hay token
            }
        },
        { immediate: true }
    )

    // Desconectar el socket
    const disconnect = () => {
        socket.value?.disconnect()
        socket.value = null
        isConnected.value = false
    }

    // Desconectar cuando el componente sea desmontado
    onUnmounted(() => disconnect())

    return {
        socket,
        isConnected,
        emit: (...args: Parameters<Socket['emit']>) => {
            if (!socket.value) throw new Error('Socket no inicializado')
            socket.value.emit(...args)
        },
        on: (...args: Parameters<Socket['on']>) => {
            if (!socket.value) throw new Error('Socket no inicializado')
            socket.value.on(...args)
        },
        disconnect,
    }
}