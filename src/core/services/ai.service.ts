import { endpoints } from './environment';
import { apiCall } from './api.config';

export const aiService = {
  async askAI(question: string, context?: string): Promise<string> {
    try {
      console.log('🤖 API: Preguntando a la IA:', question);
      console.log('🤖 API: Contexto:', context);

      const response = await apiCall(endpoints.ai.ask, {
        method: 'POST',
        body: JSON.stringify({
          question,
          context: context || 'Clínica médica',
        }),
      });

      console.log('✅ API: Respuesta de la IA obtenida');

      return response.answer || response.response || 'No se pudo obtener respuesta de la IA';
    } catch (error) {
      console.error('❌ API: Error preguntando a la IA:', error);
      throw error;
    }
  },
}; 