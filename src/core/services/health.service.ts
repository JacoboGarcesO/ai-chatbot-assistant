import { endpoints } from './environment';
import { apiCall } from './api.config';

export const healthService = {
  async getHealthStatus(): Promise<{ status: string; timestamp: string }> {
    try {
      console.log('🏥 API: Verificando estado de salud');
      const data = await apiCall(endpoints.health);
      
      console.log('✅ API: Estado de salud obtenido:', data);
      
      return {
        status: data.status || 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ API: Error verificando estado de salud:', error);
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  },
}; 