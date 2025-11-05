import React from 'react';

interface TypingIndicatorProps {
  theme?: 'light' | 'dark';
}

export function TypingIndicator({ theme = 'light' }: TypingIndicatorProps) {
  const dotColor = theme === 'dark' ? '#a78bfa' : '#8b5cf6';

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes typing {
            0%, 60%, 100% {
              opacity: 0.4;
              transform: translateY(0);
            }
            30% {
              opacity: 1;
              transform: translateY(-6px);
            }
          }
        `
      }} />
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 6,
        padding: '12px 16px',
      }}>
        <div style={{ 
          display: 'flex', 
          gap: 4,
          alignItems: 'center',
        }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: dotColor,
              opacity: 0.4,
              animation: 'typing 1.4s infinite',
              animationDelay: '0s',
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: dotColor,
              opacity: 0.4,
              animation: 'typing 1.4s infinite',
              animationDelay: '0.2s',
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: dotColor,
              opacity: 0.4,
              animation: 'typing 1.4s infinite',
              animationDelay: '0.4s',
            }}
          />
        </div>
        <span style={{ 
          fontSize: 13, 
          color: dotColor, 
          fontWeight: 500,
          marginLeft: 4,
        }}>
          AI is typing
        </span>
      </div>
    </>
  );
}

