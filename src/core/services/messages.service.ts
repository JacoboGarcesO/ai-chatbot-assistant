import { endpoints } from './environment';
import { api } from './api.config';
import type { Message } from '../types/Conversation';

export const messagesService = {
  async getMessages(customerId: string): Promise<Message[]> {
    try {
      const response = await api.get(endpoints.conversations.get(customerId));

      if (!response.success || !response.messages) {
        return [];
      }


      // Transform messages from the API response
      return response.messages.map((msg: any) => ({
        id: msg._id,
        content: msg.text,
        sender_type: msg.type === 'received' ? 'customer' : msg.metadata?.isAiGenerated ? 'bot' : 'agent',
        timestamp: msg.timestamp,
        status: msg.status || 'sent',
        isAiGenerated: msg.metadata?.isAiGenerated || false,
      }));
    } catch (error) {
      throw error;
    }
  },

  async sendMessage(customerId: string, content: string): Promise<Message> {
    try {

      const response = await api.post(endpoints.messages.send, {
        to: customerId,
        message: content,
      });


      const newMessage: Message = {
        id: response.messageId || Date.now().toString(),
        content,
        sender_type: 'agent',
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      return newMessage;
    } catch (error) {
      throw error;
    }
  },

  async sendAIMessage(customerId: string, prompt: string, role: string): Promise<Message> {
    try {
      const response = await api.post(endpoints.messages.sendAI(customerId), {
        to: customerId,
        prompt,
        context: role,
      });


      const newMessage: Message = {
        id: response.messageId || Date.now().toString(),
        content: response.message || response.text || 'Mensaje enviado con IA',
        sender_type: 'bot',
        timestamp: new Date().toISOString(),
        status: 'sent',
        isAiGenerated: true
      };

      return newMessage;
    } catch (error) {
      throw error;
    }
  },
}; 