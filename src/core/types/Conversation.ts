export interface Customer {
  id: string;
  name: string;
  phone?: string;
}

export interface Message {
  id: string;
  content: string;
  sender_type: 'customer' | 'bot' | 'agent';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  isAiGenerated?: boolean;
}

export interface LastMessage {
  text: string;
  type: string;
  timestamp: string;
}

export interface AiSettings {
  enabled: boolean;
  autoResponse: string | null;
}

export interface Conversation {
  _id: string;
  phoneNumber: string;
  clientId: string;
  contactName: string | null;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
  isActive: boolean;
  aiSettings: AiSettings;
  lastMessage: LastMessage;
} 