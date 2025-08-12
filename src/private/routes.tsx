import type { RouteObject } from 'react-router-dom';
import { Companies } from './companies/pages/companies/Companies';
import { Layout } from '../shared/components';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

export const privateRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/companies',
        Component: Companies,
      },
    ],
  },
];
