import type { Action } from "../../types/State";
import type { Message } from "../../types/Conversation";

export const messagesActions = {
  SET_MESSAGES: 'SET_MESSAGES',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_CUSTOMER_ID: 'SET_CURRENT_CUSTOMER_ID',
  ADD_MESSAGE: 'ADD_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

export const setMessages = (messages: Message[]) => ({
  type: messagesActions.SET_MESSAGES,
  payload: messages
});

export const setLoading = (loading: boolean) => ({
  type: messagesActions.SET_LOADING,
  payload: loading
});

export const setError = (error: string | null) => ({
  type: messagesActions.SET_ERROR,
  payload: error
});

export const setCurrentCustomerId = (customerId: string | null) => ({
  type: messagesActions.SET_CURRENT_CUSTOMER_ID,
  payload: customerId
});

export const addMessage = (message: Message) => ({
  type: messagesActions.ADD_MESSAGE,
  payload: message
});

export const updateMessage = (message: Message) => ({
  type: messagesActions.UPDATE_MESSAGE,
  payload: message
});

export const clearMessages = () => ({
  type: messagesActions.CLEAR_MESSAGES,
  payload: null
});

export const clearError = () => ({
  type: messagesActions.CLEAR_ERROR,
  payload: null
}); 