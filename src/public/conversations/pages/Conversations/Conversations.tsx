import { useState } from 'react';
import { Activity, Users, MessageSquare, AlertCircle } from 'lucide-react';
import { ConversationsList } from '../../components/ConversationsList/ConversationsList';
import { Chat } from '../../components/Chat/Chat';
import { useBotStatus } from '../../hooks/useBotStatus';
import { useConversations } from '../../hooks/useConversations';
import { useTheme } from '../../../../shared/hooks/useTheme';
import { BotToggle } from '../../components/BotToggle/BotToggle';
import styles from './Conversations.module.css';
import type { Conversation } from '../../../../core/types/Conversation';

export const Conversations = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const { healthStatus, stats, error: botError } = useBotStatus();
  const { conversations } = useConversations();
  const { isDarkMode } = useTheme();

  const actualSelectedConversation = selectedConversation
    ? conversations.find(conv => conv._id === selectedConversation._id) || selectedConversation
    : null;

  return (
    <div className={`${styles.conversationsPage} ${isDarkMode ? 'dark' : ''}`}>
      <div className={styles.statusBar}>
        <div className={styles.statusBarContent}>
          <div className={styles.statusBarLeft}>
            <BotToggle variant="bar" />

            <div className={styles.healthStatus}>
              <Activity className={`${styles.healthIcon} ${styles[`healthIcon${healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)}`]}`} />
              <span className={styles.healthText}>
                API: {healthStatus === 'healthy' ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          {stats && (
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <Users className={styles.statIconUsers} />
                <span className={styles.statText}>
                  {stats.total_conversations || 0} conversations
                </span>
              </div>
              <div className={styles.statItem}>
                <MessageSquare className={styles.statIconMessages} />
                <span className={styles.statText}>
                  {stats.messages_today || 0} messages today
                </span>
              </div>
            </div>
          )}
        </div>

        {botError && (
          <div className={styles.errorDisplay}>
            <AlertCircle className={styles.errorIcon} />
            <span className={styles.errorText}>{botError}</span>
          </div>
        )}
      </div>

      <div className={styles.conversationsGrid}>
        <div className={styles.conversationsListContainer}>
          <ConversationsList
            onSelectConversation={setSelectedConversation}
            selectedConversationId={actualSelectedConversation?._id}
          />
        </div>

        <div className={styles.chatContainer}>
          <Chat conversation={actualSelectedConversation} />
        </div>
      </div>
    </div>
  );
};
