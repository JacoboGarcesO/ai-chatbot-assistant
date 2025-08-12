import type { ThemeState } from '../../types/State';

export const themeInitialState: ThemeState = {
  isDarkMode: true
};

export const themeCases = {
  TOGGLE_THEME: (state: any) => ({
    ...state,
    isDarkMode: !state.isDarkMode
  }),
  SET_THEME: (state: any, payload: { isDarkMode: boolean }) => ({
    ...state,
    isDarkMode: payload.isDarkMode
  })
}; 