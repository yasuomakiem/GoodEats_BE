import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UpdateStatusService } from './update-status.service';
import { Server, Socket } from 'socket.io';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
// import { Status } from 'src/model/status.enum';
import { UserService } from 'src/user/user.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UpdateStatusGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly updateStatusService: UpdateStatusService,
    private readonly userService: UserService,
  ) {}
  private orderStatus = 'pending';
  handleConnection(client: Socket) {
    // Gửi trạng thái đơn hàng hiện tại cho client khi kết nối
    client.emit('orderStatus', this.orderStatus);
  }

  handleDisconnect() {
    this.orderStatus = '';
  }

  @SubscribeMessage('canceledOrder')
  async cancelOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    this.server.emit('handleCanceledOrder', data);
    return data;
  }

  @SubscribeMessage('createOrder')
  async create(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    this.server.emit('createOrderClient', data);
    return data;
  }

  @SubscribeMessage('restaurantAcceptOrder')
  acceptOrder(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
   console.log(data);
   
    data.status == 'cook'
      ? this.server.emit('updateOrderStatusClient', data)
      : this.server.emit('updateOrderStatusDeliver', data);

    return data;
  }

  @SubscribeMessage('deliverAcceptOrder')
  async deliverAcceptOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    const deliveryFound = await this.userService.getUser(
      data.userData.user.subject,
    );
    data.deliver = deliveryFound;
    this.server.emit('updateDeliver', data);

    return data;
  }

  @SubscribeMessage('deliverPickupOrder')
  async pickUpOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    const deliveryFound = await this.userService.getUser(data.deliverId);
    data.deliver = deliveryFound;
    data.orderData.status === 'pickup'
      ? this.server.emit('deliverUpdateOrderStatus', data)
      : this.server.emit('deliverShippingOrder', data);
    return data;
  }

  @SubscribeMessage('deliverShipped')
  async shippedOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    console.log(data);
    const deliveryFound = await this.userService.getUser(data.deliverId);
    data.deliver = deliveryFound;
    this.server.emit('deliverShippedOrder', data);
    return data;
  }
}