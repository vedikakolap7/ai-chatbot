'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { socket as clientSocket } from '../lib/socket';
import type { ConnectionState, Message } from '../lib/types';
import { ConnectionStatus } from './ConnectionStatus';
import { ChatMessage } from './ChatMessage';
import ChatInput from './ChatInput';
import React from 'react';

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<ConnectionState>('connecting');
  const [isResponding, setIsResponding] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const socket = useMemo(() => clientSocket, []);

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

  return (
    <main style={{ 
      maxWidth: 800, 
      margin: '0 auto', 
      padding: 20, 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      boxSizing: 'border-box', 
      gap: 16,
      position: 'relative',
      zIndex: 1,
    }}>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
      }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#000000', letterSpacing: '-0.5px' }}>Real-Time AI Chatbot</h1>
        <ConnectionStatus status={status} />
      </header>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        borderRadius: 24, 
        padding: 20, 
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
      }}>
        {messages.length === 0 && !streamingText && (
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#000000',
            fontSize: 16,
            fontWeight: 500,
          }}>
            Start the conversation by typing a message below.
          </div>
        )}
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {streamingText && (
          <ChatMessage
            message={{ id: 'stream', role: 'assistant', content: streamingText, timestamp: Date.now() }}
          />
        )}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={status !== 'connected' || isResponding} />
      {isResponding && (
        <div style={{ 
          fontSize: 13, 
          color: '#8b5cf6', 
          textAlign: 'left', 
          paddingLeft: 12,
          fontWeight: 500,
        }}>
          AI is typing…
        </div>
      )}
    </main>
  );
}


