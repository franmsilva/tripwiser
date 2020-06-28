import {
  DateTimeResolver,
  EmailAddressResolver,
  PhoneNumberResolver,
  CurrencyResolver,
  PositiveIntResolver,
} from 'graphql-scalars';
import User from './models/user.model';

interface LoginUserBody {
  email: string ,
  password: string,
}

export const resolvers = {
  Query: {
    async login(_: any, {email, password}: LoginUserBody) {
      const user = await User.findOne({ email });
      if (!user) return 'no user';
      if (user.password !== password) return 'no user';  //TODO: bcrypt
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
