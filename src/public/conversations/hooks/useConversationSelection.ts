import { useCallback } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import { setSelectedConversation } from '../../../core/state/conversations/actions';
import type { Conversation } from '../../../core/types/Conversation';

export const useConversationSelection = () => {
  const { state, dispatch } = useAppContext();
  const { selectedConversationId, conversations } = state;

  const selectConversation = useCallback((conversation: Conversation) => {
    dispatch(setSelectedConversation(conversation._id));
  }, [dispatch]);

  const clearSelection = useCallback(() => {
    dispatch(setSelectedConversation(null));
  }, [dispatch]);

  const selectedConversation = conversations.find(conv => conv._id === selectedConversationId) || null;

  return {
    selectedConversation,
    selectedConversationId,
    selectConversation,
    clearSelection
  };
}; 