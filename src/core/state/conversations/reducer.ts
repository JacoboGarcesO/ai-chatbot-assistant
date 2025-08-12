import { conversationsActions } from './actions';
import type { ConversationsState } from '../../types/State';
import type { Conversation } from '../../types/Conversation';

export const conversationsInitialState: ConversationsState = {
  conversations: [],
  selectedConversationId: null,
  loading: false,
  error: null,
  searchTerm: '',
  statusFilter: 'all'
};

export const conversationsCases = {
  [conversationsActions.SET_CONVERSATIONS]: (state: ConversationsState, payload: Conversation[]) => ({
    ...state,
    conversations: payload
  }),

  [conversationsActions.SET_LOADING]: (state: ConversationsState, payload: boolean) => ({
    ...state,
    loading: payload
  }),

  [conversationsActions.SET_ERROR]: (state: ConversationsState, payload: string | null) => ({
    ...state,
    error: payload
  }),

  [conversationsActions.SET_SELECTED_CONVERSATION]: (state: ConversationsState, payload: string | null) => ({
    ...state,
    selectedConversationId: payload
  }),

  [conversationsActions.SET_SEARCH_TERM]: (state: ConversationsState, payload: string) => ({
    ...state,
    searchTerm: payload
  }),

  [conversationsActions.SET_STATUS_FILTER]: (state: ConversationsState, payload: string) => ({
    ...state,
    statusFilter: payload
  }),

  [conversationsActions.ADD_CONVERSATION]: (state: ConversationsState, payload: Conversation) => ({
    ...state,
    conversations: [...state.conversations, payload]
  }),

  [conversationsActions.UPDATE_CONVERSATION]: (state: ConversationsState, payload: Conversation) => ({
    ...state,
    conversations: state.conversations.map(conv =>
      conv._id === payload._id ? payload : conv
    )
  }),

  [conversationsActions.REMOVE_CONVERSATION]: (state: ConversationsState, payload: string) => ({
    ...state,
    conversations: state.conversations.filter(conv => conv._id !== payload),
    selectedConversationId: state.selectedConversationId === payload ? null : state.selectedConversationId
  }),

  [conversationsActions.CLEAR_ERROR]: (state: ConversationsState) => ({
    ...state,
    error: null
  })
}; 