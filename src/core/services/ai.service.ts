import { endpoints } from './environment';
import { api } from './api.config';

export const aiService = {
  async askAI(question: string, context?: string): Promise<string> {
    try {
      const response = await api.post(endpoints.ai.ask, {
        question,
        context: context || 'Clínica médica',
      });

      return response.answer || response.response || 'No se pudo obtener respuesta de la IA';
    } catch (error) {
      throw error;
    }
  },
}; 