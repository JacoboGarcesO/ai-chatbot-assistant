import { Button, Input, GoogleButton } from '../../components';
import styles from './Login.module.css';

export const Login = () => {
  return (
    <main className={styles.loginContainer}>
      <section className={styles.loginCard}>
        <header className={styles.loginHeader}>
          <img className={styles.loginLogo} src="/logo.svg" alt="logo" />
          <h1 className={styles.loginTitle}>Iniciar sesión</h1>
          <p className={styles.loginSubtitle}>
            Accede a tu cuenta para continuar
          </p>
        </header>

        <form className={styles.loginForm}>
          <Input
            type="email"
            label="Correo electrónico"
            placeholder="tu@correo.com"
            required
            autoComplete="email"
            id="email"
            name="email"
          />

          <Input
            type="password"
            label="Contraseña"
            placeholder="Tu contraseña"
            required
            autoComplete="current-password"
            id="password"
            name="password"
          />

          <fieldset className={styles.loginOptions}>
            <label className={styles.loginRememberMe}>
              <input type="checkbox" className={styles.loginCheckbox} />
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
          >
            Iniciar sesión
          </Button>
        </form>

        <div className={styles.loginDivider} role="separator" aria-label="Separador de opciones de inicio de sesión">
          <span className={styles.loginDividerText}>o</span>
        </div>

        <GoogleButton className={styles.loginGoogleButton} />
      </section>
    </main>
  );
};
