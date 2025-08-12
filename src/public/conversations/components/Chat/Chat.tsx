import React, { useRef } from 'react';
import { Send, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { useMessages } from '../../hooks/useMessages';
import { useChat } from '../../hooks/useChat';
import { useChatScroll } from '../../hooks/useChatScroll';
import { useMessageInput } from '../../hooks/useMessageInput';
import { useMessageUI } from '../../hooks/useMessageUI';
import { useTheme } from '../../../../shared/hooks/useTheme';
import { BotToggle } from '../BotToggle/BotToggle';
import styles from './Chat.module.css';
import type { Conversation } from '../../../../core/types/Conversation';

interface ChatProps {
  conversation: Conversation | null;
}

export const Chat: React.FC<ChatProps> = ({ conversation }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const {
    messages,
    loading,
    error,
    sendMessage,
    sendAIMessage
  } = useMessages(conversation?.phoneNumber);

  useChat(conversation);

  const {
    messagesContainerRef,
    scrollToBottomInstantly,
    handleScroll
  } = useChatScroll(conversation);

  const {
    handleSendMessage,
    handleSendAIMessage,
    toggleAiInput
  } = useMessageInput(conversation, sendMessage, sendAIMessage);

  const {
    getMessageIcon,
    getStatusIcon,
    getSenderLabel
  } = useMessageUI();

  if (!conversation) {
    return (
      <div className={styles.chatEmptyState}>
        <div className={styles.chatEmptyStateContent}>
          <MessageSquare className={styles.chatEmptyStateIcon} />
          <h3 className={styles.chatEmptyStateTitle}>
            Selecciona una conversación
          </h3>
          <p className={styles.chatEmptyStateDescription}>
            Elige una conversación de la lista para comenzar a chatear
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.chat} ${isDarkMode ? 'dark' : ''}`}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderInfo}>
          <h2 className={styles.chatHeaderTitle}>
            {conversation.contactName || conversation.phoneNumber.replace('whatsapp:', '')}
          </h2>
          <p className={styles.chatHeaderSubtitle}>
            {conversation.phoneNumber.replace('whatsapp:', '')}
          </p>
        </div>
        <div className={styles.chatHeaderActions}>
          <button
            onClick={toggleAiInput}
            className={styles.aiButton}
          >
            <Sparkles className={styles.aiButtonIcon} />
            <span>IA</span>
          </button>
          <BotToggle variant="chat" />
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className={`${styles.messagesContainer} gems-scrollbar`}
        onScroll={handleScroll}
      >
        {loading && messages.length === 0 && (
          <div className={styles.loadingMessage}>
            Cargando mensajes...
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            <p className={styles.errorMessageText}>{error}</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageWrapper} ${message.sender_type === 'customer' ? styles.messageWrapperCustomer : styles.messageWrapperAgent
              }`}
          >
            <div
              className={`${styles.message} ${message.sender_type === 'customer'
                ? styles.messageCustomer
                : message.isAiGenerated || message.sender_type === 'bot'
                  ? styles.messageAI
                  : styles.messageAgent
                }`}
            >
              <div className={styles.messageHeader}>
                {getMessageIcon(message.sender_type, message.isAiGenerated)}
                <span className={styles.messageSender}>
                  {getSenderLabel(message.sender_type, message.isAiGenerated)}
                </span>
              </div>
              <p className={styles.messageContent}>{message.content}</p>
              <div className={styles.messageFooter}>
                <p className={styles.messageTime}>
                  {format(new Date(message.timestamp), 'HH:mm', { locale: enUS })}
                </p>
                {message.status && message.sender_type !== 'customer' && (
                  <div className={styles.messageStatus}>
                    {getStatusIcon(message.status)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.scrollButtonContainer}>
        <button
          onClick={scrollToBottomInstantly}
          className={styles.scrollButton}
          aria-label="Ir al final"
          title="Ir al último mensaje"
        >
          <ChevronDown className={styles.scrollButtonIcon} />
        </button>
      </div>

      <div className={`${styles.aiInputContainer} ${styles.showAiInput}`}>
        <div className={styles.aiInputContent}>
          <Sparkles className={styles.aiInputIcon} />
          <input
            type="text"
            placeholder="Escribe un prompt para la IA..."
            className={`${styles.aiInput} gems-scrollbar`}
            onKeyPress={(e) => e.key === 'Enter' && handleSendAIMessage()}
          />
          <button
            onClick={handleSendAIMessage}
            className={styles.aiInputSendButton}
          >
            <Send className={styles.aiInputSendIcon} />
          </button>
        </div>
      </div>

      <div className={styles.messageInputContainer}>
        <div className={styles.messageInputContent}>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className={`${styles.messageInput} gems-scrollbar`}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className={styles.messageInputSendButton}
          >
            <Send className={styles.messageInputSendIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}; 