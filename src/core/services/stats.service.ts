import { endpoints } from './environment';
import { apiCall } from './api.config';

export const statsService = {
  async getStats(): Promise<any> {
    try {
      console.log('📊 API: Obteniendo estadísticas');
      const data = await apiCall(endpoints.stats);

      console.log('✅ API: Estadísticas obtenidas:', data);

      return data;
    } catch (error) {
      console.error('❌ API: Error obteniendo estadísticas:', error);
      return {
        total_conversations: 0,
        active_conversations: 0,
        messages_today: 0,
        ai_responses: 0,
      };
    }
  },
}; 