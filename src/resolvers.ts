// Resolvers
import {
  DateTimeResolver,
  EmailAddressResolver,
  PhoneNumberResolver,
  CurrencyResolver,
  PositiveIntResolver,
} from 'graphql-scalars';

// DB Models
import User from './models/user.model';
import Trip from './models/trip.model';
import Place from './models/place.model';
import Flight from './models/flight.model';

// Auth
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { environment } from './environment';

//Mailgun
import { welcomeMail, bookedTrip } from './emailservice';

// TS Types
import {
  QueryLoginArgs,
  MutationRegisterUserArgs,
  MutationUpdateUserArgs,
  MutationCreateTripArgs,
  MutationUpdateTripArgs,
  MutationDeleteTripArgs,
  QueryPlacesArgs,
} from './types';

function matchSearch (place: string, searchValue: string) {
  console.log(place)
  place = place.toLowerCase();
  searchValue = searchValue.toLowerCase();
  const itemChar = place.charAt(searchValue.length - 1);
  const searchChar = searchValue.charAt(searchValue.length - 1)
  if (itemChar === searchChar) {
    return place.includes(searchValue);
  }
}

function filterOptions (searchValue: string, options: any) {
  return options.filter((place: any) => {
    return matchSearch(place.cityName, searchValue);
  })
}

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
      if (!user) return 'Wrong Username and/or Password';
      const match = await bcrypt.compare(password, user.password);
      if (!match) return 'Wrong Username and/or Password';
      user.token = jwt.sign({ _id: user._id }, environment.secret);
      return user;
    },
    async places(_: any, { cityNameSearch }: QueryPlacesArgs) {
      const placeArr = await Place.find({
        cityName: { $regex: cityNameSearch, $options: 'gi' },
      });

      return filterOptions(cityNameSearch, placeArr);

    },
  },
  Mutation: {
    async registerUser(_: any, { userDetails }: MutationRegisterUserArgs) {
      if (!userDetails) throw Error('No user details provided!');
      userDetails.password = await bcrypt.hash(
        userDetails.password,
        environment.saltRound
      );
      const user = await User.create(userDetails);
      user.token = jwt.sign({ _id: user._id }, environment.secret);
      welcomeMail(user.email, user.firstName+user.lastName);
      return user;
    },
    async updateUser(_: any, userDetails: MutationUpdateUserArgs, ctx: any) {
      if (userDetails.password) {
        userDetails.password = await bcrypt.hash(
          userDetails.password,
          environment.saltRound
        );
      }
      const updatedUserDetails = Object.assign(ctx.user, userDetails);
      const updatedUser = await User.findOneAndUpdate(
        { _id: ctx.user._id },
        updatedUserDetails,
        { new: true }
      ).exec();
      return updatedUser;
    },
    async createTrip(_: any, { tripInput }: MutationCreateTripArgs, ctx: any) {
      if (!tripInput) throw Error('No trip details provided!');
      const flights = [...tripInput.flights];
      tripInput.flights = [];

      for (const flight of flights) {
        // Create DB Instance of Flight
        const flightDB = await Flight.create(flight);
        tripInput.flights.push(flightDB._id);
      }

      // Create DB Instance of Trip
      const trip = await Trip.create(tripInput);

      // Add Trip ID to Creator Model
      const userDoc = await User.findOneAndUpdate(
        { _id: trip.creator },
        { $push: { trips: trip._id } },
        { new: true}
      ).populate({
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
      if (trip.booked) bookedTrip(ctx.user.email, ctx.user.firstName, trip);
      return userDoc;
    },
    async updateTrip(_: any, { _id, booked }: MutationUpdateTripArgs, ctx: any) {
      const trip = await Trip.findById(_id);
      if (!trip) throw new Error('trip not found');
      // await Flight.deleteMany({
        //   _id: {
          //     $in: trip.flights,
          //   },
          // });
          // //fill new flights
          // const { flights } = tripInput;
          // tripInput.flights = [];
          // if (flights && flights.length > 0) {
            //   for (let i = 0; i < flights.length; i++) {
              //     const flightDB = await Flight.create(flights[i]);
              //     tripInput.flights.push(flightDB._id);
              //   }
              // }
              //create updated trip
              // const updateTrip = Object.assign(trip, tripInput);
              trip.booked = booked;
              //update in db
      if (booked) bookedTrip(ctx.user.email, ctx.user.firstName, trip);
      return await Trip.findOneAndUpdate({ _id }, trip, {
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
    async deleteTrip(_: any, { tripId }: MutationDeleteTripArgs) {
      if (!tripId) throw Error('No trip ID provided!');
      const trip = await Trip.findById(tripId);
      if (!trip) throw new Error('trip not found');
      const user = await User.findById(trip.creator);
      if (!user) throw new Error('trip has no user smth went really wrong!');
      //async != filter
      if (user.trips && user.trips.length > 0) {
        for (let i = 0; i < user.trips.length; i++) {
          if (user.trips[i] === tripId) {
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
      await Trip.findByIdAndDelete(tripId);
      return true;
    },
  },

  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  PhoneNumber: PhoneNumberResolver,
  Currency: CurrencyResolver,
  PositiveInt: PositiveIntResolver,
};
