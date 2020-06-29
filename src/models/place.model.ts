import mongoose, { Schema, Document } from 'mongoose';

export interface IPlace extends Document {
  airportId: string;
  airportName: string;
  location: string;
  cityId: string;
  cityName: string;
  countryId: string;
  countryName: string;
}
const PlaceSchema: Schema = new Schema(
  {
    airportId: {
      type: String,
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

export default mongoose.model<IPlace>('Place', PlaceSchema);
