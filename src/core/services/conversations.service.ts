import { endpoints } from './environment';
import { apiCall } from './api.config';
import type { Conversation } from '../types/Conversation';

export const conversationsService = {
  async listConversations(filters?: { status?: string; customer?: string }): Promise<Conversation[]> {
    try {
      console.log('🔄 API: Iniciando listConversations con filtros:', filters);

      let endpoint = endpoints.conversations.list;
      const params = new URLSearchParams();

      if (filters?.status) {
        params.append('status', filters.status);
        console.log('🔍 API: Agregando filtro de status:', filters.status);
      }
      if (filters?.customer) {
        params.append('search', filters.customer);
        console.log('🔍 API: Agregando filtro de customer:', filters.customer);
      }

      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      console.log('📡 API: Llamando endpoint:', endpoint);
      const response = await apiCall(endpoint);
      console.log('📥 API: Respuesta recibida:', response);

      // Check if response has the expected structure
      if (!response.success || !response.conversations) {
        console.error('❌ API: Estructura de respuesta inválida:', response);
        throw new Error('Invalid API response format');
      }

      console.log('📊 API: Procesando', response.conversations.length, 'conversaciones');
      console.log('✅ API: Conversaciones obtenidas exitosamente:', response.conversations.length);

      return response.conversations;
    } catch (error) {
      console.error('❌ API: Error en listConversations:', error);
      throw error;
    }
  },

  async getConversation(id: string): Promise<Conversation | null> {
    try {
      const response = await apiCall(endpoints.conversations.get(id));

      if (!response.success || !response.conversation) {
        return null;
      }

      return response.conversation;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      return null;
    }
  },

  async searchConversations(query: string): Promise<Conversation[]> {
    try {
      console.log('🔍 API: Buscando conversaciones con query:', query);
      const response = await apiCall(endpoints.conversations.search(query));

      console.log('✅ API: Resultados de búsqueda:', response);

      // La API debería retornar el mismo formato que listConversations
      if (!response.success || !response.conversations) {
        return [];
      }

      return response.conversations;
    } catch (error) {
      console.error('❌ API: Error en búsqueda de conversaciones:', error);
      return [];
    }
  },

  async markAsRead(conversationId: string): Promise<boolean> {
    try {
      console.log('📖 API: Marcando conversación como leída:', conversationId);
      await apiCall(endpoints.conversations.markAsRead(conversationId), {
        method: 'POST',
      });
      console.log('✅ API: Conversación marcada como leída');
      return true;
    } catch (error) {
      console.error('❌ API: Error marcando como leída:', error);
      return false;
    }
  },
}; 