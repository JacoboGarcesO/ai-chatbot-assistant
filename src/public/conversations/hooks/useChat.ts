import { useCallback, useRef, useEffect } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import { conversationsService } from '../../../core/services/conversations.service';
import type { Conversation } from '../../../core/types/Conversation';

export const useChat = (conversation: Conversation | null) => {
  const { state } = useAppContext();
  const { messages } = state;
  const previousMessagesCount = useRef(0);

  const markAsRead = useCallback(async () => {
    if (!conversation) return;
    try {
      await conversationsService.markAsRead(conversation._id);
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  }, [conversation]);

  useEffect(() => {
    if (conversation) {
      markAsRead();
    }
  }, [conversation?._id, conversation?.aiSettings?.enabled, markAsRead]);

  useEffect(() => {
    if (messages.length > previousMessagesCount.current && previousMessagesCount.current > 0) {
      if (Notification.permission === 'granted') {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.sender_type === 'customer') {
          new Notification('Nuevo mensaje', {
            body: `${conversation?.contactName || 'Cliente'}: ${lastMessage.content}`,
            icon: '/logo1.png',
            tag: 'new-message'
          });
        }
      }

      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+LyvmMcAzuN1fLNeSsFJH');
        audio.play().catch(() => { });
      } catch (e) { }
    }

    previousMessagesCount.current = messages.length;
  }, [messages, conversation]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return {
    markAsRead
  };
}; 