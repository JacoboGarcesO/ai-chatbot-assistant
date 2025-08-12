import { userActions } from './actions'
import type { UserState } from '../../types/State'
import type { User } from '../../types/User'

export const userInitialState: UserState = {
  currentUser: null
}

export const userCases = {
  [userActions.REGISTER_USER_SUCCESS]: (state: UserState, payload: User) => ({ ...state, currentUser: payload }),
  [userActions.AUTHENTICATION_SUCCESS]: (state: UserState, payload: User) => ({ ...state, currentUser: payload }),
  [userActions.LOGOUT]: (state: UserState) => ({ ...state, currentUser: null })
}