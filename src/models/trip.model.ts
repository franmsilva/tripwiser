import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface ITrip extends Document {
  creator: IUser;
  booked: boolean;
  startLocation: string;
  endLocation: string;
  startDate: Date;
  destinations: IDestination[];
  flights: IFlight[];
  currency: string;
  price: number;
}

interface IDestination {}
interface IFlight {}

const UserSchema: Schema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  booked: {
    type: Boolean,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  destinations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Destination',
    },
  ],
  flights: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Flight',
    },
  ],
  currency: {
    type: String,
  },
  price: {
    type: Number,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
