import mongoose, { Document, Schema } from 'mongoose';

enum ETypeOfOrder {
  WEB,
  AT_THE_BAR,
}

export interface IOrderDocument extends Document {
  coffee: string;
  time: Date;
  type: ETypeOfOrder;
}

const UserSchema: Schema = new Schema({
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
});

export const OrderModel = mongoose.model<IOrderDocument>('order', UserSchema);
