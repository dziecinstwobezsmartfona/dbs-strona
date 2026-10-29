import mongoose, { Schema, Document } from 'mongoose';
import { MAX_CHILDREN } from '../schemas/pact';

export interface IPact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  schoolId: string;
  schoolVoivodship: string;
  schoolDistrict: string;
  schoolCounty: string;
  schoolName: string;
  numberOfChildren: number;
  gdpr_consent: boolean;
  newsletter_consent: boolean;
  createdAt: Date;
}

const PactSchema: Schema = new Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 100 },
  lastName: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },
  schoolId: { type: String, required: true, match: /^\d{1,12}$/ },
  schoolVoivodship: { type: String, required: true, trim: true, maxlength: 200 },
  schoolDistrict: { type: String, required: true, trim: true, maxlength: 200 },
  schoolCounty: { type: String, required: true, trim: true, maxlength: 200 },
  schoolName: { type: String, required: true, trim: true, maxlength: 300 },
  numberOfChildren: { type: Number, required: true, min: 1, max: MAX_CHILDREN, validate: Number.isInteger },
  gdpr_consent: { type: Boolean, required: true, validate: (value: boolean) => value === true },
  newsletter_consent: { type: Boolean, default: false },
}, {
  timestamps: true,
});

PactSchema.index({ email: 1, createdAt: -1 });

delete mongoose.models.Pact;
export default mongoose.model<IPact>('Pact', PactSchema);
