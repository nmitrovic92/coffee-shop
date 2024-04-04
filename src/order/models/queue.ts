import mongoose, { ObjectId, Schema } from 'mongoose';

export interface IOrderQueueDocument extends Document {
  orderId: ObjectId;
  priority: 0 | 1;
}

const OrderQueueSchema: Schema = new Schema(
  {
    orderId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    priority: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
  },
  { _id: false }
);

export const OrderQueueModel = mongoose.model<IOrderQueueDocument>('queue', OrderQueueSchema);
