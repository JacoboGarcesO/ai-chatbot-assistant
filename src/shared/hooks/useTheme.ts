import { useEffect } from 'react';
import { useAppContext } from '../../core/state/AppContext';

const THEME_STORAGE_KEY = 'ai-chat-sales-assistant-theme';

export const useTheme = () => {
  const { state, dispatch } = useAppContext();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME', payload: null });
  };

  const setTheme = (isDarkMode: boolean) => {
    dispatch({ type: 'SET_THEME', payload: { isDarkMode } });
  };

  // Aplicar el tema al documento HTML
  useEffect(() => {
    const root = document.documentElement;

    if (state.isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    localStorage.setItem(THEME_STORAGE_KEY, state.isDarkMode ? 'dark' : 'light');
  }, [state.isDarkMode]);

  // Cargar el tema guardado al inicializar y aplicarlo inmediatamente
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const root = document.documentElement;

    if (savedTheme !== null) {
      const isDarkMode = savedTheme === 'dark';
      if (isDarkMode !== state.isDarkMode) {
        setTheme(isDarkMode);
      }
      // Aplicar inmediatamente
      if (isDarkMode) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    } else {
      // Si no hay tema guardado, aplicar el tema por defecto (oscuro)
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, []);

  return {
    isDarkMode: state.isDarkMode,
    toggleTheme,
    setTheme
  };
}; 