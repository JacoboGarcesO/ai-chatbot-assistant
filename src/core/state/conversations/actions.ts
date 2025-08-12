import type { Action } from "../../types/State";
import type { Conversation } from "../../types/Conversation";

export const conversationsActions = {
  SET_CONVERSATIONS: 'SET_CONVERSATIONS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SELECTED_CONVERSATION: 'SET_SELECTED_CONVERSATION',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_STATUS_FILTER: 'SET_STATUS_FILTER',
  ADD_CONVERSATION: 'ADD_CONVERSATION',
  UPDATE_CONVERSATION: 'UPDATE_CONVERSATION',
  REMOVE_CONVERSATION: 'REMOVE_CONVERSATION',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

export const setConversations = (conversations: Conversation[]): Action<Conversation[]> => ({
  type: conversationsActions.SET_CONVERSATIONS,
  payload: conversations
});

export const setLoading = (loading: boolean): Action<boolean> => ({
  type: conversationsActions.SET_LOADING,
  payload: loading
});

export const setError = (error: string | null): Action<string | null> => ({
  type: conversationsActions.SET_ERROR,
  payload: error
});

export const setSelectedConversation = (conversationId: string | null): Action<string | null> => ({
  type: conversationsActions.SET_SELECTED_CONVERSATION,
  payload: conversationId
});

export const setSearchTerm = (searchTerm: string): Action<string> => ({
  type: conversationsActions.SET_SEARCH_TERM,
  payload: searchTerm
});

export const setStatusFilter = (statusFilter: string): Action<string> => ({
  type: conversationsActions.SET_STATUS_FILTER,
  payload: statusFilter
});

export const addConversation = (conversation: Conversation): Action<Conversation> => ({
  type: conversationsActions.ADD_CONVERSATION,
  payload: conversation
});

export const updateConversation = (conversation: Conversation): Action<Conversation> => ({
  type: conversationsActions.UPDATE_CONVERSATION,
  payload: conversation
});

export const removeConversation = (conversationId: string): Action<string> => ({
  type: conversationsActions.REMOVE_CONVERSATION,
  payload: conversationId
});

export const clearError = (): Action<null> => ({
  type: conversationsActions.CLEAR_ERROR,
  payload: null
}); 