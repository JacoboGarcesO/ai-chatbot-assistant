import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from './core/state/AppContext';
import { ApiErrorProvider } from './core/state/ApiErrorContext';
import './index.css';
import { privateRoutes } from './private/routes';
import { publicRoutes } from './public/routes';

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
    <ApiErrorProvider>
      <AppProvider>
        <RouterProvider router={routes} />
      </AppProvider>
    </ApiErrorProvider>
  );
