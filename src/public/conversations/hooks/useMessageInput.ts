import { useCallback } from 'react';
import type { Conversation } from '../../../core/types/Conversation';

export const useMessageInput = (
  conversation: Conversation | null,
  sendMessage: (content: string) => Promise<any>,
  sendAIMessage: (prompt: string, role: string) => Promise<any>
) => {
  const handleSendMessage = useCallback(async () => {
    const input = document.querySelector('.messageInput') as HTMLInputElement;
    if (!conversation || !input?.value.trim()) return;

    try {
      await sendMessage(input.value.trim());
      input.value = '';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [conversation, sendMessage]);

  const handleSendAIMessage = useCallback(async () => {
    const input = document.querySelector('.aiInput') as HTMLInputElement;
    if (!conversation || !input?.value.trim()) return;

    try {
      await sendAIMessage(input.value.trim(), 'Asistente de atención al cliente');
      input.value = '';
      const aiInputContainer = document.querySelector('.aiInputContainer');
      if (aiInputContainer) {
        aiInputContainer.classList.remove('showAiInput');
      }
    } catch (error) {
      console.error('Error sending AI message:', error);
    }
  }, [conversation, sendAIMessage]);

  const toggleAiInput = useCallback(() => {
    const aiInputContainer = document.querySelector('.aiInputContainer');
    if (aiInputContainer) {
      aiInputContainer.classList.toggle('showAiInput');
    }
  }, []);

  return {
    handleSendMessage,
    handleSendAIMessage,
    toggleAiInput
  };
}; 