import { useCallback, useEffect, useMemo } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import { useApiErrorHandler } from '../../../shared/hooks/useApiErrorHandler';
import { botService } from '../../../core/services/bot.service';
import {
  setBotEnabled,
  setLoading,
  setHealthStatus,
  setStats,
} from '../../../core/state/bot/actions';

export const useBotStatus = () => {
  const { state, dispatch } = useAppContext();
  const { botEnabled, loading, healthStatus, stats } = state;
  const { handleApiError } = useApiErrorHandler();

  const fetchStatus = useCallback(async () => {
    try {
      const status = await botService.getStatus();
      dispatch(setBotEnabled(status.enabled));
      dispatch(setHealthStatus(status.health as 'healthy' | 'error'));
      dispatch(setStats(status.stats));
    } catch (err) {
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useBotStatus.fetchStatus');
      }
      dispatch(setHealthStatus('error'));
    }
  }, [dispatch]); // Remover handleApiError de las dependencias

  const toggleBot = useCallback(async (enabled: boolean) => {
    try {
      dispatch(setLoading(true));

      await botService.toggleBot(enabled);
      dispatch(setBotEnabled(enabled));
      await fetchStatus();
    } catch (err) {
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useBotStatus.toggleBot');
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, fetchStatus]); // Remover handleApiError de las dependencias

  // Estabilizar fetchStatus para evitar bucles infinitos
  const stableFetchStatus = useMemo(() => fetchStatus, [dispatch]);

  useEffect(() => {
    stableFetchStatus();
  }, [stableFetchStatus]);

  return {
    botEnabled,
    healthStatus,
    stats,
    loading,
    toggleBot,
  };
}; 