import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log(`user connected: ${client.id}`)
    this.server.emit('user-join', `User client ID : ${client.id} connected`)
  }

  handleDisconnect(client: Socket) {
    console.log(`user disconnected: ${client.id}`)
    this.server.emit('user-left', `User client ID : ${client.id} disconnected`)
  }

  @SubscribeMessage('chat-message')
  handleChat(@MessageBody() message: string) {
    console.log('💬 Chat:', message);
    this.server.emit('chat-message', message);
  }

  @SubscribeMessage('map')
  handleMap(@MessageBody() data: { lat: number; lng: number }) {
    console.log('Map update:', data);
    this.server.emit('map-update', data);
  }

  @SubscribeMessage('notification')
  handleNotification(@MessageBody() msg: string) {
    console.log('🔔 Notification:', msg);
    this.server.emit('notification', msg);
  }
}
