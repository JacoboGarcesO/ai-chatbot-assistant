import React from 'react';
import { Search, Filter, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from './ConversationsList.module.css';
import { useConversations } from '../../hooks/useConversations';
import { useConversationSelection } from '../../hooks/useConversationSelection';
import { useConversationUI } from '../../hooks/useConversationUI';
import { useTheme } from '../../../../shared/hooks/useTheme';

interface ConversationsListProps {
  onSelectConversation: (conversation: any) => void;
  selectedConversationId?: string;
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
  onSelectConversation,
  selectedConversationId,
}) => {
  const { isDarkMode } = useTheme();

  const {
    conversations,
    loading,
    error,
    searchTerm,
    statusFilter,
    updateSearchTerm,
    updateStatusFilter,
    refreshConversations
  } = useConversations();

  const { selectConversation } = useConversationSelection();
  const { getStatusIcon, getStatusText, getStatusColor } = useConversationUI();

  const handleSelectConversation = (conversation: any) => {
    selectConversation(conversation);
    onSelectConversation(conversation);
  };

  return (
    <div className={`${styles.conversationsList} ${isDarkMode ? 'dark' : ''}`}>
      <div className={styles.conversationsListHeader}>
        <div className={styles.conversationsListTitleRow}>
          <h2 className={styles.conversationsListTitle}>Conversations</h2>
          <button
            onClick={refreshConversations}
            disabled={loading}
            className={styles.refreshButton}
            title="Refresh conversations"
          >
            <RefreshCw className={`${styles.refreshIcon} ${loading ? styles.refreshIconSpinning : ''}`} />
          </button>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className={styles.searchFiltersContainer}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search conversations or messages..."
              value={searchTerm}
              onChange={(e) => updateSearchTerm(e.target.value)}
              className={`${styles.searchInput} gems-scrollbar`}
            />
          </div>

          <div className={styles.filterContainer}>
            <select
              value={statusFilter}
              onChange={(e) => updateStatusFilter(e.target.value)}
              className={`${styles.filterSelect} gems-scrollbar`}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
            </select>
            <Filter className={styles.filterIcon} />
          </div>
        </div>
      </div>

      <div className={`${styles.conversationsListContent} gems-scrollbar`}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
          </div>
        ) : conversations.length === 0 ? (
          <div className={styles.emptyState}>
            {searchTerm || statusFilter !== 'all'
              ? 'No conversations match your search criteria'
              : 'No conversations found'}
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => handleSelectConversation(conversation)}
              className={`${styles.conversationItem} ${selectedConversationId === conversation._id ? styles.conversationItemSelected : ''}`}
            >
              <div className={styles.conversationItemContent}>
                <div className={styles.conversationItemMain}>
                  <div className={styles.conversationItemHeader}>
                    <h3 className={styles.conversationItemTitle}>
                      {conversation.contactName || conversation.phoneNumber.replace('whatsapp:', '')}
                    </h3>
                    <span className={`${styles.statusBadge} ${getStatusColor(conversation.isActive ? 'open' : 'closed')}`}>
                      {getStatusIcon(conversation.isActive ? 'open' : 'closed')}
                      <span className={styles.statusBadgeText}>{getStatusText(conversation.isActive ? 'open' : 'closed')}</span>
                    </span>
                  </div>

                  <p className={styles.conversationItemPhone}>
                    {conversation.phoneNumber.replace('whatsapp:', '')}
                  </p>

                  {conversation.lastMessage?.text && (
                    <p className={styles.conversationItemLastMessage}>
                      {conversation.lastMessage.text}
                    </p>
                  )}

                  <div className={styles.conversationItemTimestamp}>
                    <Clock className={styles.timestampIcon} />
                    {conversation.lastMessageAt && format(new Date(conversation.lastMessageAt), 'MMM d, yyyy HH:mm', { locale: enUS })}
                  </div>
                </div>

                <div className={styles.conversationItemSide}>
                  {conversation.aiSettings?.enabled && (
                    <div className={styles.aiIndicator} title="AI Active" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 