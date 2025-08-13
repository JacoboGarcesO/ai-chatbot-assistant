import { endpoints } from './environment';
import { api } from './api.config';

export const statsService = {
  async getStats(): Promise<any> {
    try {
      const data = await api.get(endpoints.stats);

      return data;
    } catch (error) {
      return {
        total_conversations: 0,
        active_conversations: 0,
        messages_today: 0,
        ai_responses: 0,
      };
    }
  },
}; 