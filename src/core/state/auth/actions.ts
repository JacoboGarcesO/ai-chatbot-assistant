import type { Action } from "../../types/State"
import type { User } from "../../types/User"

export const userActions = {
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
  LOGOUT: 'LOGOUT'
}

export const registerSuccess = (payload: User): Action<User> => {
  return {
    type: userActions.REGISTER_USER_SUCCESS,
    payload
  }
}

export const logout = (): Action<null> => {
  return {
    type: userActions.LOGOUT,
    payload: null
  }
}

export const authSuccess = (payload: User): Action<User> => {
  return {
    type: userActions.AUTHENTICATION_SUCCESS,
    payload
  }
}