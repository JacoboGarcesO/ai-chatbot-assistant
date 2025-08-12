import type { Action } from "../../types/State"
import type { User } from "../../types/User"

export const userActions = {
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
  LOGOUT: 'LOGOUT'
}

export const registerSuccess = ({ payload }: Action<User>) => {
  return {
    type: userActions.REGISTER_USER_SUCCESS,
    payload
  }
}

export const logout = () => {
  return {
    type: userActions.LOGOUT
  }
}

export const authSuccess = ({ payload }: Action<User>) => {
  return {
    type: userActions.AUTHENTICATION_SUCCESS,
    payload
  }
}