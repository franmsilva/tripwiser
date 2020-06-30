// Resolvers
import {
  DateTimeResolver,
  EmailAddressResolver,
  PhoneNumberResolver,
  CurrencyResolver,
  PositiveIntResolver,
} from 'graphql-scalars';

// DB Models
import User, { IUser } from './models/user.model';
import Trip, { ITrip } from './models/trip.model';
import Place, { IPlace } from './models/place.model';
import Flight, { IFlight } from './models/flight.model';

// Auth
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { environment } from './environment';

// TS Types
import { QueryLoginArgs, MutationRegisterUserArgs } from './types';

// interface LoginUserBody {
//   email: IUser['email'];
//   password: IUser['password'];
// }
// interface RegisterUserBody {
//   userDetails: {
//     email: IUser['email'];
//     password: IUser['password'];
//     firstName: IUser['firstName'];
//     lastName: IUser['lastName'];
//     phoneNumber?: IUser['phoneNumber'];
//   };
// }
// interface UpdateUserInputBody {
//   userDetails: {
//     email: IUser['email'];
//     password?: IUser['password'];
//     firstName?: IUser['firstName'];
//     lastName?: IUser['lastName'];
//     phoneNumber?: IUser['phoneNumber'];
//   };
// }
// interface TripInputBody {
//   tripInput: {
//     creator: ITrip['creator'];
//     booked: ITrip['booked'];
//     startLocation: ITrip['startLocation'];
//     endLocation: ITrip['endLocation'];
//     startDate: ITrip['startDate'];
//     destinations: ITrip['destinations'];
//     flights: ITrip['flights'];
//     currency: ITrip['currency'];
//     price: ITrip['price'];
//   };
// }
// interface TripUpdateBody {
//   tripInput: {
//     _id: string;
//     creator: ITrip['creator'];
//     booked?: ITrip['booked'];
//     startLocation?: ITrip['startLocation'];
//     endLocation?: ITrip['endLocation'];
//     startDate?: ITrip['startDate'];
//     destinations?: ITrip['destinations'];
//     flights?: ITrip['flights'];
//     currency?: ITrip['currency'];
//     price?: ITrip['price'];
//   };
// }

export const resolvers = {
  Query: {
    async login(_: any, { email, password }: QueryLoginArgs) {
      const user = await User.findOne({ email }).populate({
        path: 'trips',
        model: Trip,
        populate: [
          {
            path: 'startLocation endLocation destinations',
            model: Place,
          },
          {
            path: 'flights',
            model: Flight,
            populate: {
              path: 'origin destination',
              model: Place,
            },
          },
        ],
      });
      if (!user) return 'no user';
      if (user.password !== password) return 'no user'; //TODO: bcrypt
      user.token = jwt.sign({ _id: user._id }, environment.secret);
      return user;
    },
  },
  Mutation: {
    async registerUser(_: any, { userDetails }: MutationRegisterUserArgs) {
      userDetails.password = await bcrypt.hash(
        userDetails.password,
        environment.saltRound
      );
      const user = await User.create(userDetails);
      user.token = jwt.sign({ _id: user._id }, environment.secret);
      return user;
    },
    async updateUser(_: any, { userDetails }: UpdateUserInputBody) {
      const user = await User.findOneAndUpdate(
        { email: userDetails.email },
        userDetails,
        { new: true }
      ).exec();
      return user;
    },
    async createTrip(_: any, { tripInput }: TripInputBody) {
      const flights = [...tripInput.flights];
      tripInput.flights = [];

      for (let i = 0; i < flights.length; i++) {
        // Create DB Instance of Flight
        const flightDB = await Flight.create(flights[i]);
        tripInput.flights.push(flightDB._id);
      }

      // Create DB Instance of Trip
      const trip = await Trip.create(tripInput);

      // Add Trip ID to Creator Model
      await User.findOneAndUpdate(
        { _id: trip.creator },
        { $push: { trips: trip._id } }
      );

      return trip;
    },
    async updateTrip(_: any, { tripInput }: TripUpdateBody) {
      //get the trip from db
      const trip = await Trip.findById(tripInput._id);
      if (!trip) throw new Error('trip not found');
      await Flight.deleteMany({
        _id: {
          $in: trip.flights,
        },
      });
      //fill new flights
      const { flights } = tripInput;
      tripInput.flights = [];
      if (flights && flights.length > 0) {
        for (let i = 0; i < flights.length; i++) {
          const flightDB = await Flight.create(flights[i]);
          tripInput.flights.push(flightDB._id);
        }
      }
      //create updated trip
      const updateTrip = Object.assign(trip, tripInput);
      //update in db
      return await Trip.findOneAndUpdate({ _id: tripInput._id }, updateTrip, {
        new: true,
      }).populate([
        {
          path: 'startLocation endLocation destinations',
          model: Place,
        },
        {
          path: 'flights',
          model: Flight,
          populate: {
            path: 'origin destination',
            model: Place,
          },
        },
      ]);
    },
    async deleteTrip(_: any, { tripid }: any) {
      const trip = await Trip.findById(tripid);
      if (!trip) throw new Error('trip not found');
      const user = await User.findById(trip.creator);
      if (!user) throw new Error('trip has no user smth went really wrong!');
      //async != filter
      if (user.trips && user.trips.length > 0) {
        for (let i = 0; i < user.trips.length; i++) {
          if (user.trips[i] === tripid) {
            user.trips.splice(i, 1);
          }
        }
      }
      await User.findByIdAndUpdate(user.id, user);
      await Flight.deleteMany({
        _id: {
          $in: trip.flights,
        },
      });
      await Trip.findByIdAndDelete(tripid);
      return true;
    },
  },

  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  PhoneNumber: PhoneNumberResolver,
  Currency: CurrencyResolver,
  PositiveInt: PositiveIntResolver,
};
