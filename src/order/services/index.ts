import { OrderDTO } from '@order/dtos/index';
import { IOrderDocument, OrderModel } from '@order/models/index';
import 'reflect-metadata';
import { Service } from 'typedi';

@Service()
export default class OrderService {
  constructor() {}

  public makeCoffee(): void {
    console.log('makeCoffee');
  }

  public createOrder(order: OrderDTO): Promise<IOrderDocument> {
    return OrderModel.create(order);
  }
}
