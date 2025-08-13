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
    searchTerm,
    statusFilter,
    updateSearchTerm,
    updateStatusFilter,
    refreshConversations
  } = useConversations();

  const { selectConversation } = useConversationSelection();
  const { getStatusIcon, getStatusText } = useConversationUI();

  const handleSelectConversation = (conversation: any) => {
    selectConversation(conversation);
    onSelectConversation(conversation);
  };

  return (
    <div className={`${styles.conversationsList} ${isDarkMode ? 'dark' : ''}`}>
      <div className={styles.conversationsListHeader}>
        <div className={styles.conversationsListTitleRow}>
          <h2 className={styles.conversationsListTitle}>Chats</h2>
          <button
            onClick={refreshConversations}
            disabled={loading}
            className={styles.refreshButton}
            title="Refresh conversations"
          >
            <RefreshCw className={`${styles.refreshIcon} ${loading ? styles.refreshIconSpinning : ''}`} />
          </button>
        </div>

        <div className={styles.searchFiltersContainer}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar o iniciar un nuevo chat..."
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
              <option value="all">Todos los chats</option>
              <option value="open">Abiertos</option>
              <option value="closed">Cerrados</option>
              <option value="pending">Pendientes</option>
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
              ? 'No se encontraron chats que coincidan con tu búsqueda'
              : 'No hay chats disponibles'}
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              className={`${styles.conversationItem} ${selectedConversationId === conversation._id ? styles.conversationItemSelected : ''
                }`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className={styles.conversationItemContent}>
                <div className={styles.conversationItemHeader}>
                  <span className={styles.conversationItemName}>
                    {conversation.contactName || conversation.phoneNumber?.replace('whatsapp:', '') || 'Unknown Customer'}
                  </span>
                  <div className={styles.conversationItemTime}>
                    <Clock className={styles.conversationItemTimeIcon} />
                    <span className={styles.conversationItemTimeText}>
                      {format(new Date(conversation.lastMessageAt || conversation.createdAt), 'HH:mm', { locale: enUS })}
                    </span>
                  </div>
                </div>

                <div className={styles.conversationItemMessageContainer}>
                  <div className={styles.conversationItemMessage}>
                    {conversation.lastMessage?.text || 'Ningún mensaje aún'}

                  </div>
                  <div className={styles.conversationItemMeta}>
                    <div className={styles.conversationItemStatus}>
                      {getStatusIcon(conversation.isActive ? 'open' : 'closed')}
                      <span className={styles.conversationItemStatusText}>
                        {getStatusText(conversation.isActive ? 'open' : 'closed')}
                      </span>
                    </div>
                    <span className={styles.conversationItemUnread}>
                      {conversation.unreadCount > 0 && (
                        <span className={styles.conversationItemUnreadBadge}>
                          {conversation.unreadCount}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 