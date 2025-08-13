import { endpoints } from './environment';
import { api } from './api.config';

export const healthService = {
  async getHealthStatus(): Promise<{ status: string; timestamp: string }> {
    try {
      const data = await api.get(endpoints.health);

      return {
        status: data.status || 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  },
}; 