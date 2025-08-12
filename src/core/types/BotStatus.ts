export interface BotStats {
  total_conversations: number;
  messages_today: number;
}

export interface BotStatus {
  botEnabled: boolean;
  healthStatus: 'healthy' | 'error' | 'loading';
  stats?: BotStats;
  loading: boolean;
  error?: string;
} 