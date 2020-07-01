import { ApolloServer } from 'apollo-server';
import {
  DateTimeMock,
  EmailAddressMock,
  PhoneNumberMock,
  CurrencyMock,
  PositiveIntMock,
} from 'graphql-scalars';

import { getUserFromToken } from './auth';
import { Authentication } from './directives';
import { environment } from './environment';
import { resolvers } from './resolvers';
import typeDefs from './type-defs';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  schemaDirectives: {
    authentication: Authentication,
  },
  context({ req }) {
    const token = req.headers.authorization;
    const user = getUserFromToken(token);
    return { user };
  },
  mocks: {
    DateTime: DateTimeMock,
    EmailAddress: EmailAddressMock,
    PhoneNumber: PhoneNumberMock,
    Currency: CurrencyMock,
    PositiveInt: PositiveIntMock,
  }, // TODO: Remove in PROD.
  mockEntireSchema: false, // TODO: Remove in PROD.
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
});

server
  .listen(environment.port)
  .then(({ url }) => console.log(`Server ready at ${url}.`));
