import type { ConnectionState } from '../lib/types';
import React from 'react';

interface ConnectionStatusProps {
  status: ConnectionState;
  theme?: 'light' | 'dark';
}

export function ConnectionStatus({ status, theme = 'light' }: ConnectionStatusProps) {
  const color = status === 'connected' ? '#16a34a' : status === 'connecting' ? '#f59e0b' : '#ef4444';
  const label = status === 'connected' ? 'Connected' : status === 'connecting' ? 'Connecting' : 'Disconnected';
  
  const bgColor = theme === 'dark' 
    ? 'rgba(30, 30, 30, 0.5)' 
    : 'rgba(255, 255, 255, 0.5)';
  const borderColor = theme === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.2)'
    : '1px solid rgba(255, 255, 255, 0.6)';
  const textColor = theme === 'dark' ? '#a78bfa' : '#7c3aed';

  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 8,
      padding: '8px 14px',
      background: bgColor,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: 16,
      border: borderColor,
      boxShadow: '0 4px 16px rgba(139, 92, 246, 0.15)',
    }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 0 2px ${color}40, 0 0 8px ${color}60`,
        }}
      />
      <span style={{ fontSize: 12, color: textColor, fontWeight: 600 }}>{label}</span>
    </span>
  );
}


