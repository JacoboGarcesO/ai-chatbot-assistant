import { endpoints } from './environment';
import { apiCall } from './api.config';
import type { BotStats } from '../types/BotStatus';

export const botService = {
  async getStatus(): Promise<{ enabled: boolean; health: string; stats?: BotStats }> {
    try {
      console.log('🤖 API: Obteniendo estado del bot');
      const response = await apiCall(endpoints.bot.status);

      console.log('✅ API: Estado del bot obtenido:', response);

      return {
        enabled: response.autoResponseEnabled || false,
        health: response.health || 'healthy',
        stats: response.stats ? {
          total_conversations: response.stats.total_conversations || 0,
          messages_today: response.stats.messages_today || 0,
        } : undefined
      };
    } catch (error) {
      console.error('❌ API: Error obteniendo estado del bot:', error);
      throw error;
    }
  },

  async toggleBot(enabled: boolean): Promise<void> {
    try {
      console.log('🔄 API: Cambiando estado del bot a:', enabled);
      await apiCall(endpoints.bot.toggle, {
        method: 'POST',
        body: JSON.stringify({ enabled }),
      });
      console.log('✅ API: Estado del bot cambiado exitosamente');
    } catch (error) {
      console.error('❌ API: Error cambiando estado del bot:', error);
      throw error;
    }
  },
}; 