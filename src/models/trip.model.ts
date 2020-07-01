import mongoose from '../connect';
import { Document } from 'mongoose';
import { IUser } from './user.model';
import { IFlight } from './flight.model';
import { IPlace } from './place.model';

const Schema = mongoose.Schema;

export interface ITrip extends Document {
  creator: string; // User ID as Reference
  booked: boolean;
  startLocation: IPlace['_id'];
  endLocation: IPlace['_id'];
  startDate: Date;
  destinations: IPlace['_id'];
  flights: IFlight['_id'];
  currency: string;
  price: number;
}

const TripSchema = new Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    booked: {
      type: Boolean,
      required: true,
    },
    startLocation: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },

    endLocation: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    destinations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Place',
      },
    ],
    flights: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
      },
    ],
    currency: String,
    price: Number,
  },
  { timestamps: true }
);

export default mongoose.model<ITrip>('Trip', TripSchema);
