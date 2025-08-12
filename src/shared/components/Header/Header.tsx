import styles from './Header.module.css';
import { useAppContext } from '../../../core/state/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { state } = useAppContext();
  const { isDarkMode, toggleTheme } = useTheme();

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
      <button className={styles.headerAvatarButton}>
        <img
          className={styles.headerAvatar}
          src={state.currentUser?.avatar}
          alt={`Avatar de ${state.currentUser?.name}`}
        />
      </button>
    </header>
  );
};
