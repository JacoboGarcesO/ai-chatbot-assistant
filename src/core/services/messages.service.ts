import { endpoints } from './environment';
import { apiCall } from './api.config';
import type { Message } from '../types/Conversation';

export const messagesService = {
  async getMessages(customerId: string): Promise<Message[]> {
    try {
      console.log('📥 API: Obteniendo mensajes para customer:', customerId);
      const response = await apiCall(endpoints.conversations.get(customerId));

      if (!response.success || !response.messages) {
        console.log('⚠️ API: No se encontraron mensajes o respuesta inválida');
        return [];
      }

      console.log('✅ API: Mensajes obtenidos exitosamente:', response.messages.length);

      // Transform messages from the API response
      return response.messages.map((msg: any) => ({
        id: msg._id,
        content: msg.text,
        sender_type: msg.type === 'received' ? 'customer' : 'bot',
        timestamp: msg.timestamp,
        status: msg.status || 'sent',
        isAiGenerated: msg.metadata?.isAiGenerated || false,
      }));
    } catch (error) {
      console.error('❌ API: Error obteniendo mensajes:', error);
      throw error;
    }
  },

  async sendMessage(customerId: string, content: string): Promise<Message> {
    try {
      console.log('📤 API: Enviando mensaje manual a:', customerId, 'Contenido:', content);

      const response = await apiCall(endpoints.messages.send(customerId), {
        method: 'POST',
        body: JSON.stringify({
          to: customerId,
          message: content,
        }),
      });

      console.log('✅ API: Respuesta del envío manual:', response);

      const newMessage: Message = {
        id: response.messageId || Date.now().toString(),
        content,
        sender_type: 'agent',
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      return newMessage;
    } catch (error) {
      console.error('❌ API: Error enviando mensaje manual:', error);
      throw error;
    }
  },

  async sendAIMessage(customerId: string, prompt: string, role: string): Promise<Message> {
    try {
      console.log('🤖 API: Enviando mensaje con IA a:', customerId);
      console.log('🤖 API: Prompt:', prompt);
      console.log('🤖 API: Role:', role);

      const response = await apiCall(endpoints.messages.sendAI(customerId), {
        method: 'POST',
        body: JSON.stringify({
          to: customerId,
          prompt,
          context: role,
        }),
      });

      console.log('✅ API: Respuesta del envío con IA:', response);

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
      console.error('❌ API: Error enviando mensaje con IA:', error);
      throw error;
    }
  },
}; 