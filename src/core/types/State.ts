import type { User } from "./User";

export interface Action<T> {
  type: string;
  payload: T;
}

export interface UserState {
  currentUser: User | null;
}

export interface ThemeState {
  isDarkMode: boolean;
}

export interface State extends UserState, ThemeState {
}

