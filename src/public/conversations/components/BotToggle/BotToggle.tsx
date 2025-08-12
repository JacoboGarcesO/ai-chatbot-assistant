import React from 'react';
import { Bot, ToggleLeft, ToggleRight } from 'lucide-react';
import { useBotStatus } from '../../hooks/useBotStatus';
import styles from './BotToggle.module.css';

interface BotToggleProps {
  variant?: 'bar' | 'chat';
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

export const BotToggle: React.FC<BotToggleProps> = ({
  variant = 'bar',
  showIcon = true,
  showLabel = true,
  className = ''
}) => {
  const { botEnabled, loading, toggleBot } = useBotStatus();

  const handleToggle = async () => {
    await toggleBot(!botEnabled);
  };

  if (variant === 'bar') {
    return (
      <div className={`${styles.botToggle} ${styles.botToggleBar} ${className}`}>
        {showIcon && (
          <Bot className={`${styles.botToggleIcon} ${botEnabled ? styles.botToggleIconActive : styles.botToggleIconInactive}`} />
        )}
        {showLabel && (
          <span className={styles.botToggleLabel}>
            Bot: {botEnabled ? 'Active' : 'Inactive'}
          </span>
        )}
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`${styles.botToggleButton} ${botEnabled ? styles.botToggleButtonActive : styles.botToggleButtonInactive}`}
        >
          {botEnabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.botToggle} ${styles.botToggleChat} ${className}`}>
      {showLabel && (
        <span className={styles.botToggleChatLabel}>IA Auto</span>
      )}
      <button
        onClick={handleToggle}
        disabled={loading}
        className={styles.botToggleChatButton}
        title={`${botEnabled ? 'Desactivar' : 'Activar'} IA automática`}
      >
        {botEnabled ? (
          <ToggleRight className={styles.botToggleChatIconActive} />
        ) : (
          <ToggleLeft className={styles.botToggleChatIconInactive} />
        )}
      </button>
    </div>
  );
}; 