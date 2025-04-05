import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

export function useLogin() {
  const usuario = ref('');
  const contraseña = ref('');
  const isLoading = ref(false);
  const errorMessage = ref('');
  const showPassword = ref(false);

  const { login } = useAuth();
  const router = useRouter();

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

  return {
    usuario,
    contraseña,
    showPassword,
    isLoading,
    errorMessage,
    handleLogin
  };
}
