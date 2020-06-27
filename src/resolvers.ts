import {
  DateTimeResolver,
  EmailAddressResolver,
  PhoneNumberResolver,
  CurrencyResolver,
  PositiveIntResolver,
} from 'graphql-scalars';

export const resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  PhoneNumber: PhoneNumberResolver,
  Currency: CurrencyResolver,
  PositiveInt: PositiveIntResolver,
};
