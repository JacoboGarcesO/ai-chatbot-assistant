import { useCallback, useEffect, useMemo } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import { useApiErrorHandler } from '../../../shared/hooks/useApiErrorHandler';
import { messagesService } from '../../../core/services/messages.service';
import {
  setMessages,
  setLoading,
  setCurrentCustomerId,
  addMessage,
  clearMessages,
} from '../../../core/state/messages/actions';

export const useMessages = (customerId?: string) => {
  const { state, dispatch } = useAppContext();
  const { messages, loading, currentCustomerId } = state;
  const { handleApiError } = useApiErrorHandler();

  const fetchMessages = useCallback(async () => {
    if (!customerId) return;

    try {
      dispatch(setLoading(true));
      dispatch(setCurrentCustomerId(customerId));

      const data = await messagesService.getMessages(customerId);
      dispatch(setMessages(data));
    } catch (err) {
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useMessages.fetchMessages');
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [customerId, dispatch]); // Remover handleApiError de las dependencias

  const sendMessage = useCallback(async (content: string) => {
    if (!customerId) throw new Error('No customer ID provided');

    try {
      const newMessage = await messagesService.sendMessage(customerId, content);
      dispatch(addMessage(newMessage));
      return newMessage;
    } catch (err) {
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useMessages.sendMessage');
      }
      throw err instanceof Error ? err : new Error('Failed to send message');
    }
  }, [customerId, dispatch]); // Remover handleApiError de las dependencias

  const sendAIMessage = useCallback(async (prompt: string, role: string) => {
    if (!customerId) throw new Error('No customer ID provided');

    try {
      const newMessage = await messagesService.sendAIMessage(customerId, prompt, role);
      dispatch(addMessage(newMessage));
      return newMessage;
    } catch (err) {
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useMessages.sendAIMessage');
      }
      throw err instanceof Error ? err : new Error('Failed to send AI message');
    }
  }, [customerId, dispatch]); // Remover handleApiError de las dependencias

  // Estabilizar fetchMessages para evitar bucles infinitos
  const stableFetchMessages = useMemo(() => fetchMessages, [customerId, dispatch]);

  useEffect(() => {
    if (customerId !== currentCustomerId) {
      dispatch(clearMessages());
    }
    stableFetchMessages();
  }, [customerId, currentCustomerId, stableFetchMessages, dispatch]);

  return {
    messages,
    loading,
    sendMessage,
    sendAIMessage,
    refetch: fetchMessages,
  };
};