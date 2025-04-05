import { ref } from 'vue';

const isDarkMode = ref(false); // Fuera de la función: compartido globalmente

export function useTheme() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    isDarkMode.value = savedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  };

  return {
    isDarkMode,
    toggleTheme,
    initTheme,
  };
}
