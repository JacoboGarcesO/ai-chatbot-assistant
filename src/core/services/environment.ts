export const environment = {
  apiUrl: import.meta.env.API_URL
}

export const endpoints = {
  auth: {
    register: `${environment.apiUrl}/auth/register`,
    login: `${environment.apiUrl}/auth/login`,
  },
  conversations: {
    conversations: `${environment.apiUrl}/api/conversations`,
    sendMessage: `${environment.apiUrl}/api/send-message`,
  },
  health: `${environment.apiUrl}/api/health`,
  botStatus: `${environment.apiUrl}/api/auto-response/status`,
  botToggle: `${environment.apiUrl}/api/auto-response/toggle`,
  sendAiMessage: `${environment.apiUrl}/api/send-ai-message`,
  askAi: `${environment.apiUrl}/api/ask-ai`,
  stats: `${environment.apiUrl}/api/stats`,
};
