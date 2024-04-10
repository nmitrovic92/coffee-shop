import events from 'events';
import mongoose, { Document, Schema } from 'mongoose';

export enum ETypeOfOrder {
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

export const OrderModel = mongoose.model<IOrderDocument>('order', OrderSchema);
