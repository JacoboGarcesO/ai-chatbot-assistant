import { botActions } from './actions';
import type { BotState } from '../../types/State';

export const botInitialState: BotState = {
  botEnabled: false,
  loading: false,
  error: null,
  healthStatus: 'loading',
  stats: undefined
};

export const botCases = {
  [botActions.SET_BOT_ENABLED]: (state: BotState, payload: boolean) => ({
    ...state,
    botEnabled: payload
  }),

  [botActions.SET_LOADING]: (state: BotState, payload: boolean) => ({
    ...state,
    loading: payload
  }),

  [botActions.SET_ERROR]: (state: BotState, payload: string | null) => ({
    ...state,
    error: payload
  }),

  [botActions.SET_HEALTH_STATUS]: (state: BotState, payload: 'healthy' | 'error' | 'loading') => ({
    ...state,
    healthStatus: payload
  }),

  [botActions.SET_STATS]: (state: BotState, payload: any) => ({
    ...state,
    stats: payload
  }),

  [botActions.CLEAR_ERROR]: (state: BotState) => ({
    ...state,
    error: null
  })
}; 