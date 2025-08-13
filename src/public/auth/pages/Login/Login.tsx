import { useState, useEffect } from 'react';
import { Button, Input, GoogleButton } from '../../components';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { useAuthRedirect } from '../../../../shared/hooks/useAuthRedirect';
import styles from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { signInWithEmail, signInWithGoogle, loading, error, clearError } = useAuth();

  useAuthRedirect();

  useEffect(() => {
    clearError();
  }, [email, password, clearError]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmail(email, password);
  };

  return (
    <main className={styles.loginContainer}>
      <section className={styles.loginCard}>
        <header className={styles.loginHeader}>
          <img className={styles.loginLogo} src="./logo.svg" alt="logo" />
          <h1 className={styles.loginTitle}>Iniciar sesión</h1>
          <p className={styles.loginSubtitle}>
            Accede a tu cuenta para continuar
          </p>
        </header>

        {error && (
          <div className={styles.loginError}>
            {error}
          </div>
        )}

        <form className={styles.loginForm} onSubmit={handleEmailLogin}>
          <Input
            type="email"
            label="Correo electrónico"
            placeholder="tu@correo.com"
            required
            autoComplete="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Input
            type="password"
            label="Contraseña"
            placeholder="Tu contraseña"
            required
            autoComplete="current-password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <fieldset className={styles.loginOptions}>
            <label className={styles.loginRememberMe}>
              <input
                type="checkbox"
                className={styles.loginCheckbox}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span className={styles.loginCheckboxLabel}>Recordarme</span>
            </label>
            <a href="#" className={styles.loginForgotPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </fieldset>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>

        <div className={styles.loginDivider} role="separator" aria-label="Separador de opciones de inicio de sesión">
          <span className={styles.loginDividerText}>o</span>
        </div>

        <GoogleButton
          className={styles.loginGoogleButton}
          onClick={signInWithGoogle}
          disabled={loading}
        />
      </section>
    </main>
  );
};
