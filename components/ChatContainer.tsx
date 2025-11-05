'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { socket as clientSocket } from '../lib/socket';
import type { ConnectionState, Message } from '../lib/types';
import { ConnectionStatus } from './ConnectionStatus';
import { ChatMessage } from './ChatMessage';
import ChatInput from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { useTheme } from '../lib/theme';
import { Trash2, Sun, Moon } from 'lucide-react';
import React from 'react';

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<ConnectionState>('connecting');
  const [isResponding, setIsResponding] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  const socket = useMemo(() => clientSocket, []);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
      setStreamingText('');
    }
  };

  useEffect(() => {
    if (!socket) return;

    function onConnect() {
      setStatus('connected');
    }
    function onDisconnect() {
      setStatus('disconnected');
    }
    function onError() {
      setStatus('disconnected');
    }
    function onChunk(payload: { id: string; text: string }) {
      setStreamingText((prev) => prev + payload.text);
    }
    function onDone(payload: { id: string }) {
      if (streamingText.trim().length > 0) {
        const aiMessage: Message = {
          id: payload.id,
          role: 'assistant',
          content: streamingText,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
      setStreamingText('');
      setIsResponding(false);
    }
    function onErrorEvent(payload: { id: string; message: string }) {
      setStreamingText('');
      setIsResponding(false);
      // Optional: surface an error message
      console.error('Chat error:', payload.message);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError);
    socket.on('chunk', onChunk);
    socket.on('done', onDone);
    socket.on('error', onErrorEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError);
      socket.off('chunk', onChunk);
      socket.off('done', onDone);
      socket.off('error', onErrorEvent);
    };
  }, [socket, streamingText]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, streamingText]);

  async function handleSend(content: string) {
    const messageId = crypto.randomUUID();
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsResponding(true);

    setStreamingText('');

    try {
      socket?.emit('user_message', { id: messageId, text: content });
    } catch {
      setIsResponding(false);
    }
  }

  const headerBg = theme === 'dark'
    ? 'rgba(30, 30, 30, 0.6)'
    : 'rgba(255, 255, 255, 0.5)';
  const headerBorder = theme === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.2)'
    : '1px solid rgba(255, 255, 255, 0.6)';
  const headerTextColor = theme === 'dark' ? '#e5e7eb' : '#000000';
  const chatBg = theme === 'dark'
    ? 'rgba(30, 30, 30, 0.4)'
    : 'rgba(255, 255, 255, 0.4)';
  const chatBorder = theme === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.2)'
    : '1px solid rgba(255, 255, 255, 0.5)';
  const emptyTextColor = theme === 'dark' ? '#9ca3af' : '#000000';

  return (
    <main
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        boxSizing: "border-box",
        gap: "16px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* HEADER */}
      <header
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          background: headerBg,
          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",
          borderRadius: 24,
          border: headerBorder,
          boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            color: headerTextColor,
            letterSpacing: "-0.5px",
          }}
        >
          AI Chatbot
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Clear Button */}
          <button
            onClick={handleClearChat}
            disabled={messages.length === 0 && !streamingText}
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              border: "none",
              background:
                messages.length === 0 && !streamingText
                  ? theme === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)"
                  : theme === "dark"
                    ? "rgba(239, 68, 68, 0.2)"
                    : "rgba(239, 68, 68, 0.1)",
              color:
                messages.length === 0 && !streamingText
                  ? theme === "dark"
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(0, 0, 0, 0.3)"
                  : theme === "dark"
                    ? "#ef4444"
                    : "#dc2626",
              cursor:
                messages.length === 0 && !streamingText
                  ? "not-allowed"
                  : "pointer",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
          >
            <Trash2 size={14} />
            Clear
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              padding: "8px",
              borderRadius: 12,
              border: "none",
              background:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              color: headerTextColor,
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <ConnectionStatus status={status} theme={theme} />
        </div>
      </header>

      {/* SCROLLABLE CHAT AREA */}
      <div
        style={{
          flex: "1 1 auto",
          overflowY: "auto",
          borderRadius: 24,
          padding: 20,
          background: chatBg,
          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",
          border: chatBorder,
          boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)",
          minHeight: 0, // ✅ key line so flex child scrolls properly
        }}
      >
        {messages.length === 0 && !streamingText && (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: emptyTextColor,
              fontSize: 16,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Start the conversation by typing a message below.
          </div>
        )}

        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} theme={theme} />
        ))}

        {streamingText && (
          <ChatMessage
            message={{
              id: "stream",
              role: "assistant",
              content: streamingText,
              timestamp: Date.now(),
            }}
            theme={theme}
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR */}
      <div
        style={{
          flexShrink: 0,
          marginTop: 8,
        }}
      >
        <ChatInput
          onSend={handleSend}
          disabled={status !== "connected" || isResponding}
          theme={theme}
        />
      </div>

      {/* TYPING INDICATOR */}
      {isResponding && <TypingIndicator theme={theme} />}
    </main>

  );
}


