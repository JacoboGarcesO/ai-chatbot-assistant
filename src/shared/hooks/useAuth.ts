import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../core/state/AppContext';
import { useApiErrorHandler } from './useApiErrorHandler';
import { firebaseService } from '../../core/services/firebase.service';
import { authSuccess, logout as logoutAction } from '../../core/state/auth/actions';

export const useAuth = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const { handleApiError } = useApiErrorHandler();

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await firebaseService.signInWithEmail(email, password);
      dispatch(authSuccess(user));
      return user;
    } catch (err) {
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useAuth.signInWithEmail');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]); // Remover handleApiError de las dependencias

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      const user = await firebaseService.signInWithGoogle();
      dispatch(authSuccess(user));
      return user;
    } catch (err) {
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useAuth.signInWithGoogle');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]); // Remover handleApiError de las dependencias

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await firebaseService.signOut();
      dispatch(logoutAction());
    } catch (err) {
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useAuth.logout');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]); // Remover handleApiError de las dependencias

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
    signInWithEmail,
    signInWithGoogle,
    logout,
    isAuthenticated: !!state.currentUser
  };
}; 