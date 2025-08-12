import { messagesActions } from './actions';
import type { MessagesState } from '../../types/State';
import type { Message } from '../../types/Conversation';

export const messagesInitialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
  currentCustomerId: null
};

export const messagesCases = {
  [messagesActions.SET_MESSAGES]: (state: MessagesState, payload: Message[]) => ({
    ...state,
    messages: payload
  }),

  [messagesActions.SET_LOADING]: (state: MessagesState, payload: boolean) => ({
    ...state,
    loading: payload
  }),

  [messagesActions.SET_ERROR]: (state: MessagesState, payload: string | null) => ({
    ...state,
    error: payload
  }),

  [messagesActions.SET_CURRENT_CUSTOMER_ID]: (state: MessagesState, payload: string | null) => ({
    ...state,
    currentCustomerId: payload
  }),

  [messagesActions.ADD_MESSAGE]: (state: MessagesState, payload: Message) => ({
    ...state,
    messages: [...state.messages, payload]
  }),

  [messagesActions.UPDATE_MESSAGE]: (state: MessagesState, payload: Message) => ({
    ...state,
    messages: state.messages.map(msg =>
      msg.id === payload.id ? payload : msg
    )
  }),

  [messagesActions.CLEAR_MESSAGES]: (state: MessagesState) => ({
    ...state,
    messages: []
  }),

  [messagesActions.CLEAR_ERROR]: (state: MessagesState) => ({
    ...state,
    error: null
  })
}; 