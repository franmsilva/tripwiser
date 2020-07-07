import mongoose from '../connect';
import { Document, Model } from 'mongoose';
import User, { IUser } from './user.model';
import { IFlight } from './flight.model';
import { IPlace } from './place.model';
import { environment } from '../environment';
import { sendSMS } from '../twilio';

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

interface TripStaticModel extends Model<ITrip> {

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

TripSchema.statics.sendSMSReminder = async function ()  {
  const dayold = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  const tripsReminded = await Trip.find({ "created_at": { "$gte": dayold } });
  let ids: string[] = [];
   tripsReminded.reduce((trip) => {
      if (ids.includes(trip.creator)) return trip
      ids = [...ids, trip.creator];
      return trip;
  });
   if (ids.length > 0) {
    const users = await User.find(ids);
    sendToUsers(users);
  }
  
};

const sendToUsers = (users: IUser[])  => {
  users.forEach((user) => {
    if (!user.phoneNumber) return;
    const option = {
      to: user.phoneNumber,
      from : environment.twilio.phoneNumber,
      body: `Hello ${user.firstName} from tripWiser ju still have open trips in you wishlist`
    }
    sendSMS(option);
  });
}

const Trip = mongoose.model<ITrip>('Trip', TripSchema);
export default Trip;
