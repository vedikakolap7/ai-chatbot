export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number; // epoch ms
}

export type ConnectionState = 'connecting' | 'connected' | 'disconnected';

export interface StreamingChunkEvent {
  type: 'chunk';
  data: string;
}

export interface StreamingDoneEvent {
  type: 'done';
}

export interface StreamingErrorEvent {
  type: 'error';
  error: string;
}

export type WebSocketEvent = StreamingChunkEvent | StreamingDoneEvent | StreamingErrorEvent;


