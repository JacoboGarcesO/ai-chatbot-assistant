import { useCallback, useEffect } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import { botService } from '../../../core/services/bot.service';
import {
  setBotEnabled,
  setLoading,
  setError,
  setHealthStatus,
  setStats,
  clearError
} from '../../../core/state/bot/actions';

export const useBotStatus = () => {
  const { state, dispatch } = useAppContext();
  const { botEnabled, loading, error, healthStatus, stats } = state;

  const fetchStatus = useCallback(async () => {
    try {
      dispatch(clearError());
      const status = await botService.getStatus();
      dispatch(setBotEnabled(status.enabled));
      dispatch(setHealthStatus(status.health as 'healthy' | 'error'));
      dispatch(setStats(status.stats));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bot status';
      dispatch(setError(errorMessage));
      dispatch(setHealthStatus('error'));
    }
  }, [dispatch]);

  const toggleBot = useCallback(async (enabled: boolean) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      await botService.toggleBot(enabled);
      dispatch(setBotEnabled(enabled));
      await fetchStatus();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle bot';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, fetchStatus]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    botEnabled,
    healthStatus,
    stats,
    loading,
    error,
    toggleBot,
  };
}; 