import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BarChart3, Settings, FileText, Building2 } from 'lucide-react';
import styles from './Sidebar.module.css';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavigationItem[] = [
  {
    name: 'Conversaciones',
    href: '/conversations',
    icon: MessageSquare,
  },
  {
    name: 'Reportes',
    href: '/reports',
    icon: BarChart3,
  },
  {
    name: 'Configuración',
    href: '/settings',
    icon: Settings,
  },
  {
    name: 'Contexto',
    href: '/context',
    icon: FileText,
  },
  {
    name: 'Empresas',
    href: '/companies',
    icon: Building2,
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className={styles.sidebar} role="complementary" aria-label="Navegación principal">
      <header className={styles.sidebarHeader}>
        <img className={styles.sidebarLogo} src="./logo.svg" alt="Logo de GEMS Innovations" />
        <div>
          <h1 className={styles.sidebarTitle}>GEMS Innovations</h1>
          <p className={styles.sidebarSubtitle}>Technology</p>
        </div>
      </header>

      <nav className={styles.sidebarNav} aria-label="Menú de navegación">
        <menu className={styles.sidebarNavList}>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`${styles.sidebarNavItem} ${isActive ? styles.sidebarNavItemIsActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className={`${styles.sidebarNavIcon} ${isActive ? styles.sidebarNavIconIsActive : ''}`} aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </menu>
      </nav>
    </aside>
  );
};

