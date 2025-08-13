import { useCallback, useState } from 'react';
import type { Conversation } from '../../../core/types/Conversation';

export const useMessageInput = (
  conversation: Conversation | null,
  sendMessage: (content: string) => Promise<any>,
  sendAIMessage: (prompt: string, role: string) => Promise<any>
) => {
  const [showAiInput, setShowAiInput] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [aiInput, setAiInput] = useState('');

  const handleSendMessage = useCallback(async () => {
    if (!conversation || !messageInput.trim()) return;

    try {
      await sendMessage(messageInput.trim());
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [conversation, sendMessage, messageInput]);

  const handleSendAIMessage = useCallback(async () => {
    if (!conversation || !aiInput.trim()) return;

    try {
      await sendAIMessage(aiInput.trim(), 'Asistente de atención al cliente');
      setAiInput('');
      setShowAiInput(false);
    } catch (error) {
      console.error('Error sending AI message:', error);
    }
  }, [conversation, sendAIMessage, aiInput]);

  const toggleAiInput = useCallback(() => {
    setShowAiInput(prev => !prev);
  }, []);

  return {
    handleSendMessage,
    handleSendAIMessage,
    toggleAiInput,
    showAiInput,
    messageInput,
    setMessageInput,
    aiInput,
    setAiInput
  };
}; 