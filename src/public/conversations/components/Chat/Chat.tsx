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
import styles from './Chat.module.css';
import type { Conversation } from '../../../../core/types/Conversation';

interface ChatProps {
  conversation: Conversation | null;
}

export const Chat: React.FC<ChatProps> = ({ conversation }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const messageClassesOptions = {
    customer: styles.messageWrapperCustomer,
    agent: styles.messageWrapperAgent,
    bot: styles.messageWrapperAI,
  }

  const {
    messages,
    loading,
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
    toggleAiInput,
    showAiInput,
    messageInput,
    setMessageInput,
    aiInput,
    setAiInput
  } = useMessageInput(conversation, sendMessage, sendAIMessage);

  const {
    getStatusIcon,
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
          <img className={styles.chatHeaderProfile} src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZmlsfGVufDB8fDB8fHww' alt={`Profile picture for ${conversation.contactName}`} />
          <h2>
            {conversation.contactName || conversation.phoneNumber.replace('whatsapp:', '')}
          </h2>
        </div>
        <div className={styles.chatHeaderActions}>
          <button
            onClick={toggleAiInput}
            className={styles.aiButton}
          >
            <Sparkles className={styles.aiButtonIcon} />
            <span>IA</span>
          </button>
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

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageWrapper} ${messageClassesOptions[message.sender_type]}`}
          >
            <div
              className={`${styles.message} ${message.sender_type === 'customer'
                ? styles.messageCustomer
                : message.isAiGenerated || message.sender_type === 'bot'
                  ? styles.messageAI
                  : styles.messageAgent
                }`}
            >
              <p className={styles.messageContent}>{message.content}</p>
              <div className={message.isAiGenerated ? styles.messageFooterAI : styles.messageFooter}>
                {message.isAiGenerated && <Sparkles className={styles.messageFooterIcon} />}
                <div className={styles.messageFooterContent}>
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

      <div className={`${styles.aiInputContainer} ${showAiInput ? styles.showAiInput : ''}`}>
        <div className={styles.aiInputContent}>
          <Sparkles className={styles.aiInputIcon} />
          <input
            type="text"
            placeholder="Escribe un prompt para la IA..."
            className={`${styles.aiInput} gems-scrollbar`}
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendAIMessage()}
          />
          <button
            onClick={handleSendAIMessage}
            className={styles.messageInputSendButton}
          >
            <Send className={styles.messageInputSendIcon} />
          </button>
        </div>
      </div>

      <div className={styles.messageInputContainer}>
        <div className={styles.messageInputContent}>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className={`${styles.messageInput} gems-scrollbar`}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
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