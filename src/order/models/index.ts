import events from 'events';
import mongoose, { CallbackWithoutResultAndOptionalError, Document, Schema } from 'mongoose';
import { OrderQueueModel } from './queue';

enum ETypeOfOrder {
  WEB = 'WEB',
  AT_THE_BAR = 'AT_THE_BAR',
}

enum EOrderStatus {
  PENDING,
  DONE,
  ERROR,
}

export interface IOrderDocument extends Document {
  coffee: string;
  time: Date;
  type: ETypeOfOrder;
  status: EOrderStatus;
}

const orderRejectEvent = new events.EventEmitter();

const OrderSchema: Schema = new Schema({
  coffee: {
    type: String,
    required: true,
    min: 4,
    max: 250,
  },
  time: {
    type: Date,
    required: true,
    enum: Object.values(ETypeOfOrder),
  },
  type: {
    type: String,
    required: true,
    default: 'WEB',
    enum: Object.values(ETypeOfOrder),
  },
  status: {
    type: String,
    required: true,
    default: 'PENDING',
    enum: Object.values(EOrderStatus),
  },
});

OrderSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError): Promise<any> {
  const queueSize = await OrderQueueModel.countDocuments({ priority: 1 });
  const orderType = this.type;

  if (queueSize >= 5 && orderType === ETypeOfOrder.AT_THE_BAR) {
    orderRejectEvent.emit('onOrderReject');
    throw new Error('Waiting queue is full');
  }

  next();
});

OrderSchema.post('save', async function (orderDocument: IOrderDocument): Promise<any> {
  const { _id, type } = orderDocument;
  await OrderQueueModel.insertMany({
    orderId: _id,
    priority: type === ETypeOfOrder.AT_THE_BAR ? 1 : 0,
  });
});

export const OrderModel = mongoose.model<IOrderDocument>('order', OrderSchema);
