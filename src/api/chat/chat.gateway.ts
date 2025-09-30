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
  handleMessage(@MessageBody() message: string) {
    console.log('Message', message);
    this.server.emit('chat-message', message)

  }
}
