import { endpoints } from './environment';
import { api } from './api.config';
import type { BotStats } from '../types/BotStatus';

export const botService = {
  async getStatus(): Promise<{ enabled: boolean; health: string; stats?: BotStats }> {
    try {
      const response = await api.get(endpoints.bot.status);

      return {
        enabled: response.autoResponseEnabled || false,
        health: response.health || 'healthy',
        stats: response.stats ? {
          total_conversations: response.stats.total_conversations || 0,
          messages_today: response.stats.messages_today || 0,
        } : undefined
      };
    } catch (error) {
      throw error;
    }
  },

  async toggleBot(enabled: boolean): Promise<void> {
    try {
      await api.post(endpoints.bot.toggle, { enabled });
    } catch (error) {
      throw error;
    }
  },
}; 