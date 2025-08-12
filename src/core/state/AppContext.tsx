import { createContext, useReducer, useContext } from 'react'
import { userCases } from './auth/reducer';
import { themeCases, themeInitialState } from './theme/reducer';
import type { Action, State } from '../types/State'
import { userInitialState } from './auth/reducer';


export const initialState: State = {
  ...userInitialState,
  ...themeInitialState
};

const AppContext = createContext<{ state: State; dispatch: (action: Action<any>) => void }>({ state: initialState, dispatch: () => { } });

export const reducer = (state: State, action: Action<any>) => {
  const cases: Record<string, (state: any, payload: any) => any> = {
    ...userCases,
    ...themeCases,
  };

  return cases[action.type](state, action.payload) || state;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  return context;
};