import mongoose from '../connect';
import { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface IPlace extends Document {
  airportId: string;
  airportName: string;
  location: string;
  cityId: string;
  cityName: string;
  countryId: string;
  countryName: string;
}
const PlaceSchema = new Schema(
  {
    airportId: {
      type: String,
      unique: true,
    },
    airportName: {
      type: String,
    },
    location: {
      type: String,
    },
    cityId: {
      type: String,
    },
    cityName: {
      type: String,
    },
    countryId: {
      type: String,
    },
    countryName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPlace>('places', PlaceSchema);
