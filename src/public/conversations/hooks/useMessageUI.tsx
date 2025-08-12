import { User, Brain, Check, CheckCheck } from 'lucide-react';
import styles from '../components/Chat/Chat.module.css';

export const useMessageUI = () => {
  const getMessageIcon = (senderType: string, isAiGenerated?: boolean) => {
    if (senderType === 'customer') {
      return <User className={ styles.messageIconCustomer } />;
    } else if (senderType === 'bot' || isAiGenerated) {
      return <Brain className={ styles.messageIconAI } />;
    } else {
      return <User className={ styles.messageIconAgent } />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return <Check className={ styles.statusIconSent } />;
      case 'delivered':
        return <CheckCheck className={ styles.statusIconDelivered } />;
      case 'read':
        return <CheckCheck className={ styles.statusIconRead } />;
      default:
        return <Check className={ styles.statusIconSent } />;
    }
  };

  const getSenderLabel = (senderType: string, isAiGenerated?: boolean) => {
    if (senderType === 'customer') {
      return 'Cliente';
    } else if (senderType === 'bot' || isAiGenerated) {
      return 'IA';
    } else {
      return 'Agente';
    }
  };

  return {
    getMessageIcon,
    getStatusIcon,
    getSenderLabel
  };
}; 