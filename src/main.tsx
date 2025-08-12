import { createRoot } from 'react-dom/client';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from './public/routes';
import { privateRoutes } from './private/routes';
import { AppProvider } from './core/state/AppContext';

// Aplicar tema inmediatamente para evitar flash de tema incorrecto
const applyThemeImmediately = () => {
  const savedTheme = localStorage.getItem('ai-chat-sales-assistant-theme');
  const root = document.documentElement;

  if (savedTheme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    // Por defecto oscuro
    root.classList.add('dark');
    root.classList.remove('light');
  }
};

// Aplicar tema antes de renderizar
applyThemeImmediately();

const routes = createHashRouter([...publicRoutes, ...privateRoutes]);

createRoot(document.getElementById('root')!)
  .render(
    <AppProvider>
      <RouterProvider router={routes} />
    </AppProvider>
  );
