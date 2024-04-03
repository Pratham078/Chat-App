import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000';

export const initiateSocketConnection = () => {
  const socket = io(SOCKET_URL);
  return socket;
};