import {
  DateTimeResolver,
  EmailAddressResolver,
  PhoneNumberResolver,
  CurrencyResolver,
  PositiveIntResolver,
} from 'graphql-scalars';
import User from './models/user.model';

export const resolvers = {
  Query: {
    async login(_: any, args: any) {
      const user = await User.findOne({ email: args.email });
      if (!user) return 'no user';
      //TODO: verify pw
      return user;
    },
  },
  Mutation: {
    async register(_: any, args: any) {
      const user = await User.create(args);
      return user;
    },
  },

  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  PhoneNumber: PhoneNumberResolver,
  Currency: CurrencyResolver,
  PositiveInt: PositiveIntResolver,
};
