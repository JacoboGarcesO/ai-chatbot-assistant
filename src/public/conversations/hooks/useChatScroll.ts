import { useCallback, useRef, useEffect } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import type { Conversation } from '../../../core/types/Conversation';

export const useChatScroll = (conversation: Conversation | null) => {
  const { state } = useAppContext();
  const { messages } = state;
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousMessagesCount = useRef(0);

  const scrollToBottomInstantly = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      const showScrollButton = !isAtBottom && messages.length > 3;

      if (showScrollButton) {
        const progress = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
        const scrollProgress = Math.max(0, Math.min(1, progress));
        messagesContainerRef.current.style.setProperty('--scroll-progress', scrollProgress.toString());
      }
    }
  }, [messages.length]);

  useEffect(() => {
    if (messages.length > previousMessagesCount.current) {
      if (previousMessagesCount.current > 0) {
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

      setTimeout(() => {
        scrollToBottomInstantly();
      }, 100);
    }

    previousMessagesCount.current = messages.length;
  }, [messages, conversation, scrollToBottomInstantly]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return {
    messagesContainerRef,
    scrollToBottomInstantly,
    handleScroll
  };
};