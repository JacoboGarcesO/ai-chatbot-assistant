import { MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import styles from '../components/ConversationsList/ConversationsList.module.css';

export const useConversationUI = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <MessageSquare className={ styles.statusIconOpen } />;
      case 'closed':
        return <CheckCircle className={ styles.statusIconClosed } />;
      case 'pending':
        return <Clock className={ styles.statusIconPending } />;
      default:
        return <AlertCircle className={ styles.statusIconUnknown } />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closed':
        return 'Closed';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return styles.statusBadgeOpen;
      case 'closed':
        return styles.statusBadgeClosed;
      case 'pending':
        return styles.statusBadgePending;
      default:
        return styles.statusBadgeUnknown;
    }
  };

  return {
    getStatusIcon,
    getStatusText,
    getStatusColor
  };
}; 