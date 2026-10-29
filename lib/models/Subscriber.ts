import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  fullName: string;
  email: string;
  createdAt: Date;
}

const SubscriberSchema: Schema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
}, {
  timestamps: true,
});

delete mongoose.models.Subscriber;
export default mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
