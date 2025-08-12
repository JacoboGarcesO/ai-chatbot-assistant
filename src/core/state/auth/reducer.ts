import { userActions } from './actions'
import type { UserState } from '../../types/State'
import { UserRole, type User } from '../../types/User'

export const userInitialState: UserState = {
  // TODO: Remove this after testing
  currentUser: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: UserRole.CUSTOMER,
    createdAt: new Date(),
    updatedAt: new Date(),
    avatar: 'https://avatars.githubusercontent.com/u/155118605?v=4'
  }
}

export const userCases = {
  [userActions.REGISTER_USER_SUCCESS]: (state: UserState, payload: User) => ({ ...state, currentUser: payload }),
  [userActions.AUTHENTICATION_SUCCESS]: (state: UserState, payload: User) => ({ ...state, currentUser: payload }),
  [userActions.LOGOUT]: (state: UserState) => ({ ...state, currentUser: null })
}