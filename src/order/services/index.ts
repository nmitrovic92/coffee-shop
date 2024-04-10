import { OrderDTO } from '@order/dtos/index';
import { ETypeOfOrder, OrderModel } from '@order/models/index';
import { OrderQueueModel } from '@order/models/queue';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { Service } from 'typedi';

@Service()
export default class OrderService {
  constructor() {
    this.watchQueueChanges();
  }

  public async createOrder(order: OrderDTO): Promise<void> {
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        const { _id, type } = await OrderModel.create(order);
        await OrderQueueModel.create({
          orderId: _id,
          priority: type === ETypeOfOrder.AT_THE_BAR ? 1 : 0,
        });
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  public watchQueueChanges(): void {
    const db = mongoose.connection;

    db.once('open', () => {
      console.log('DB connected...');
      const msgCollection = db.collection('queues');
      const changeStream = msgCollection.watch();

      changeStream.on('change', (change) => console.log(change));
    });
  }
}
