import type { RouteObject } from 'react-router-dom';
import { Companies } from './companies/pages/companies/Companies';
import { Layout } from '../shared/components';

export const privateRoutes: RouteObject[] = [
  {
    path: '',
    Component: Layout,
    children: [
      {
        path: '/companies',
        Component: Companies,
      },
    ],
  },
];
