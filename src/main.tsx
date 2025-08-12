import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from './public/routes';
import { privateRoutes } from './private/routes';
import { AppProvider } from './core/state/AppContext';

const routes = createBrowserRouter([...publicRoutes, ...privateRoutes]);

createRoot(document.getElementById('root')!)
  .render(
    <AppProvider>
      <RouterProvider router={routes} />
    </AppProvider>
  );
