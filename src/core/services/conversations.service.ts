import { endpoints } from './environment';
import { api } from './api.config';
import type { Conversation } from '../types/Conversation';

export const conversationsService = {
  async listConversations(filters?: { status?: string; customer?: string }): Promise<Conversation[]> {
    try {

      let endpoint = endpoints.conversations.list;
      const params = new URLSearchParams();

      if (filters?.status) {
        params.append('status', filters.status);
      }
      if (filters?.customer) {
        params.append('search', filters.customer);
      }

      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      const response = await api.get(endpoint);

      // Check if response has the expected structure
      if (!response.success || !response.conversations) {
        throw new Error('Invalid API response format');
      }

      return response.conversations;
    } catch (error) {
      throw error;
    }
  },

  async getConversation(id: string): Promise<Conversation | null> {
    try {
      const response = await api.get(endpoints.conversations.get(id));

      if (!response.success || !response.conversation) {
        return null;
      }

      return response.conversation;
    } catch (error) {
      return null;
    }
  },

  async searchConversations(query: string): Promise<Conversation[]> {
    try {
      const response = await api.get(endpoints.conversations.search(query));

      // La API debería retornar el mismo formato que listConversations
      if (!response.success || !response.conversations) {
        return [];
      }

      return response.conversations;
    } catch (error) {
      return [];
    }
  },

  async markAsRead(conversationId: string): Promise<boolean> {
    try {
      await api.post(endpoints.conversations.markAsRead(conversationId));
      return true;
    } catch (error) {
      return false;
    }
  },
}; 