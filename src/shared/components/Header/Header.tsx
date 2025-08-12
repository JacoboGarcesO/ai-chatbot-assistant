import { useState, useRef, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import styles from './Header.module.css';
import { useAppContext } from '../../../core/state/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { state } = useAppContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className={styles.header}>
      <button
        className={styles.headerDarkModeButton}
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {isDarkMode ? (
          <Sun className={styles.headerDarkModeIcon} size={20} />
        ) : (
          <Moon className={styles.headerDarkModeIcon} size={20} />
        )}
      </button>

      <div className={styles.headerUserMenu} ref={menuRef}>
        <button
          className={styles.headerAvatarButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú de usuario"
        >
          <img
            className={styles.headerAvatar}
            src={state.currentUser?.avatar}
            alt={`Avatar de ${state.currentUser?.name}`}
          />
        </button>

        {isMenuOpen && (
          <div className={styles.headerDropdownMenu}>
            <div className={styles.headerUserInfo}>
              <span className={styles.headerUserName}>{state.currentUser?.name}</span>
              <span className={styles.headerUserEmail}>{state.currentUser?.email}</span>
            </div>
            <div className={styles.headerDropdownDivider} />
            <button
              className={styles.headerDropdownItem}
              onClick={handleLogout}
            >
              <LogOut className={styles.headerDropdownIcon} size={16} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
