import mongoose, { Schema, Document } from 'mongoose';

export interface IPact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  schoolId: string;
  schoolVoivodship: string;
  schoolDistrict: string;
  schoolCounty: string;
  schoolName: string;
  consent: boolean;
  createdAt: Date;
}

const PactSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  schoolId: { type: String, required: true },
  schoolVoivodship: { type: String, required: true },
  schoolDistrict: { type: String, required: true },
  schoolCounty: { type: String, required: true },
  schoolName: { type: String, required: true },
  consent: { type: Boolean, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Pact || mongoose.model<IPact>('Pact', PactSchema);
