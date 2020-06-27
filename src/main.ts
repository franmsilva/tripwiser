import { ApolloServer } from 'apollo-server';
import {
  DateTimeMock,
  EmailAddressMock,
  PhoneNumberMock,
  CurrencyMock,
  PositiveIntMock,
} from 'graphql-scalars';

import { environment } from './environment';
import { resolvers } from './resolvers';
import typeDefs from './type-defs.graphql';

const server = new ApolloServer({
  resolvers,
  typeDefs,
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

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => console.log('Module disposed. '));
}