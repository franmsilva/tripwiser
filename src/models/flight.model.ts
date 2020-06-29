import mongoose, { Schema, Document } from 'mongoose';
import { IPlace } from './place.model';

export interface IFlight extends Document {
  origin: IPlace['_id'];
  destination: IPlace['_id'];
  depatureDate: Date;
  arrivalDate: Date;
  airline: string;
  currency: string;
  price: number;
}

const FlightSchema: Schema = new Schema(
  {
    origin: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    airline: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IFlight>('Flight', FlightSchema);
