import { useCallback, useEffect } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import { messagesService } from '../../../core/services/messages.service';
import {
  setMessages,
  setLoading,
  setError,
  setCurrentCustomerId,
  addMessage,
  clearMessages,
  clearError
} from '../../../core/state/messages/actions';

export const useMessages = (customerId?: string) => {
  const { state, dispatch } = useAppContext();
  const { messages, loading, error, currentCustomerId } = state;

  const fetchMessages = useCallback(async () => {
    if (!customerId) return;

    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      dispatch(setCurrentCustomerId(customerId));

      const data = await messagesService.getMessages(customerId);
      dispatch(setMessages(data));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }, [customerId, dispatch]);

  const sendMessage = useCallback(async (content: string) => {
    if (!customerId) throw new Error('No customer ID provided');

    try {
      const newMessage = await messagesService.sendMessage(customerId, content);
      dispatch(addMessage(newMessage));
      return newMessage;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to send message');
    }
  }, [customerId, dispatch]);

  const sendAIMessage = useCallback(async (prompt: string, role: string) => {
    if (!customerId) throw new Error('No customer ID provided');

    try {
      const newMessage = await messagesService.sendAIMessage(customerId, prompt, role);
      dispatch(addMessage(newMessage));
      return newMessage;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to send AI message');
    }
  }, [customerId, dispatch]);

  useEffect(() => {
    if (customerId !== currentCustomerId) {
      dispatch(clearMessages());
    }
    fetchMessages();
  }, [customerId, currentCustomerId, fetchMessages, dispatch]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    sendAIMessage,
    refetch: fetchMessages,
  };
}; 