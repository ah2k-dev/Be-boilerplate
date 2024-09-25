import { Server as SocketIOServer, Socket } from 'socket.io';
import { addUser, removeUserBySocketId } from './userManagement';
import {Server as HttpServer} from 'http';

class SocketService {
  private io: SocketIOServer | null = null;

  initialize(httpServer: HttpServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: '*', // Allow all origins
      }
    });

    console.log('Socket initialized');

    this.io.on('connection', (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('join', (userId: string) => {
        addUser(userId, socket.id);
      });

      socket.on('logout', () => {
        removeUserBySocketId(socket.id);
      });

      socket.on('disconnect', () => {
        removeUserBySocketId(socket.id);
      });
    });
  }

  public getIO() {
    if (!this.io) {
      throw new Error('Socket.io is not initialized');
    }
    return this.io;
  }
}

export const socketService = new SocketService();
