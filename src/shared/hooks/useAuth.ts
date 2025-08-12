import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../core/state/AppContext';
import { firebaseService } from '../../core/services/firebase.service';
import { authSuccess, logout as logoutAction } from '../../core/state/auth/actions';

export const useAuth = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await firebaseService.signInWithEmail(email, password);
      dispatch(authSuccess(user));
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await firebaseService.signInWithGoogle();
      dispatch(authSuccess(user));
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión con Google';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await firebaseService.signOut();
      dispatch(logoutAction());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authSuccess(user));
      } else {
        dispatch(logoutAction());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return {
    user: state.currentUser,
    loading,
    error,
    signInWithEmail,
    signInWithGoogle,
    logout,
    clearError,
    isAuthenticated: !!state.currentUser
  };
}; 