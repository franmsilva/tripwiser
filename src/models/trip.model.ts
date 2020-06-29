import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';
import { IFlight } from './flight.model';
import { IPlace } from './place.model';

export interface ITrip extends Document {
  creator: string; // User ID
  booked: boolean;
  startLocation: IPlace['_id'];
  endLocation: IPlace['_id'];
  startDate: Date;
  destinations: IPlace['_id'];
  flights: IFlight['_id'];
  currency: string;
  price: number;
}

const TripSchema: Schema = new Schema(
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
    },

    endLocation: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
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
