import type { Action } from "../../types/State";
import type { BotStats } from "../../types/State";

export const botActions = {
  SET_BOT_ENABLED: 'SET_BOT_ENABLED',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_HEALTH_STATUS: 'SET_HEALTH_STATUS',
  SET_STATS: 'SET_STATS',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

export const setBotEnabled = (enabled: boolean): Action<boolean> => ({
  type: botActions.SET_BOT_ENABLED,
  payload: enabled
});

export const setLoading = (loading: boolean): Action<boolean> => ({
  type: botActions.SET_LOADING,
  payload: loading
});

export const setError = (error: string | null): Action<string | null> => ({
  type: botActions.SET_ERROR,
  payload: error
});

export const setHealthStatus = (healthStatus: 'healthy' | 'error' | 'loading'): Action<'healthy' | 'error' | 'loading'> => ({
  type: botActions.SET_HEALTH_STATUS,
  payload: healthStatus
});

export const setStats = (stats: BotStats | undefined): Action<BotStats | undefined> => ({
  type: botActions.SET_STATS,
  payload: stats
});

export const clearError = (): Action<null> => ({
  type: botActions.CLEAR_ERROR,
  payload: null
}); 