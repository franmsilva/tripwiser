import mongoose, { Schema, Document } from 'mongoose';
import { ITrip } from './trip.model';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  favouritedTrips: ITrip['_id'];
  bookedTrips: ITrip['_id'];
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String
  },
  favouritedTrips: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
    },
  ],
  bookedTrips: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
    },
  ],
});


export default mongoose.model<IUser>('User', UserSchema);