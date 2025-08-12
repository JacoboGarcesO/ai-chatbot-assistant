import type { User } from "./User";
import type { Conversation, Message } from "./Conversation";

export interface Action<T> {
  type: string;
  payload: T;
}

export interface UserState {
  currentUser: User | null;
}

export interface ThemeState {
  isDarkMode: boolean;
}

export interface ConversationsState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;
}

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  currentCustomerId: string | null;
}

export interface BotStats {
  total_conversations?: number;
  messages_today?: number;
}

export interface BotState {
  botEnabled: boolean;
  loading: boolean;
  error: string | null;
  healthStatus: 'healthy' | 'error' | 'loading';
  stats: BotStats | undefined;
}

export interface State extends UserState, ThemeState, ConversationsState, MessagesState, BotState {
}

