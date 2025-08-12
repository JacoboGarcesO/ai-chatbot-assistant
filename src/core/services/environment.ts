export const environment = {
  apiUrl: import.meta.env.VITE_API_URL
}

export const endpoints = {
  auth: {
    register: `${environment.apiUrl}/auth/register`,
    login: `${environment.apiUrl}/auth/login`,
  },
  conversations: {
    list: `${environment.apiUrl}/api/conversations`,
    get: (id: string) => `${environment.apiUrl}/api/conversations/${id}`,
    search: (query: string) => `${environment.apiUrl}/api/conversations/search/${query}`,
    markAsRead: (id: string) => `${environment.apiUrl}/api/conversations/${id}/read`,
  },
  messages: {
    get: (customerId: string) => `${environment.apiUrl}/api/messages/${customerId}`,
    send: (customerId: string) => `${environment.apiUrl}/api/messages/${customerId}`,
    sendAI: (customerId: string) => `${environment.apiUrl}/api/messages/${customerId}/ai`,
  },
  bot: {
    status: `${environment.apiUrl}/api/bot/status`,
    toggle: `${environment.apiUrl}/api/bot/toggle`,
  },
  health: `${environment.apiUrl}/api/health`,
  stats: `${environment.apiUrl}/api/stats`,
  ai: {
    ask: `${environment.apiUrl}/api/ai/ask`,
  },
};
