import { io, Socket } from 'socket.io-client';

const WS_URL = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001') : '';

export const socket: Socket | null = typeof window !== 'undefined'
  ? io(WS_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      reconnectionDelayMax: 5000,
      autoConnect: true,
    })
  : null;


