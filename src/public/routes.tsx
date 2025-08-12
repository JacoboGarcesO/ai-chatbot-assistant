import type { RouteObject } from 'react-router-dom';
import { Login } from './auth/pages';

import { Context } from './context/pages/context/Context';
import { Conversations } from './conversations/pages/Conversations/Conversations';
import { Reports } from './reports/pages/reports/Reports';
import { Settings } from './settings/pages/settings/Settings';
import { Layout } from '../shared/components';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    Component: Login,
  },
  {
    path: '',
    Component: Layout,
    children: [
      {
        path: '/conversations',
        Component: Conversations,
      },
      {
        path: '/settings',
        Component: Settings,
      },
      {
        path: '/reports',
        Component: Reports,
      },
      {
        path: '/context',
        Component: Context,
      },
    ],
  },
];