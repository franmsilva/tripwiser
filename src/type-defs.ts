import { gql } from 'apollo-server';

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  directive @authentication on FIELD_DEFINITION

  scalar DateTime
  scalar EmailAddress
  scalar PhoneNumber
  scalar Currency
  scalar PositiveInt

  type Query {
    login(email: EmailAddress!, password: String!): User!
    logout(email: EmailAddress!, password: String!): User!
    places(cityNameSearch: String!): [Place!]!
  }

  type Mutation {
    registerUser(userDetails: UserRegisterInput): User!
    updateUser(
      email: EmailAddress
      password: String
      firstName: String
      lastName: String
      phoneNumber: PhoneNumber
    ): User! @authentication
    createTrip(tripInput: TripCreateInput): User! @authentication
    updateTrip(_id: ID!, booked: Boolean!): Trip! @authentication
    deleteTrip(tripId: String!): Boolean! @authentication
  }

  type User {
    _id: ID!
    email: EmailAddress!
    password: String!
    firstName: String
    lastName: String!
    phoneNumber: PhoneNumber
    trips: [Trip]!
    token: String
  }

  type Trip {
    _id: ID!
    creator: ID!
    booked: Boolean!
    startLocation: Place!
    endLocation: Place!
    startDate: DateTime!
    destinations: [Place!]!
    flights: [Flight!]!
    currency: Currency!
    price: PositiveInt!
  }

  type Flight {
    _id: ID!
    origin: Place!
    destination: Place!
    departureDate: DateTime!
    arrivalDate: DateTime!
    airline: String!
    currency: Currency!
    price: PositiveInt!
  }

  type Place {
    _id: ID!
    airportId: String!
    airportName: String!
    location: String!
    cityId: String!
    cityName: String!
    countryId: String!
    countryName: String!
  }

  input UserRegisterInput {
    email: EmailAddress!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: PhoneNumber
  }

  input UserUpdateInput {
    email: EmailAddress
    password: String
    firstName: String
    lastName: String
    phoneNumber: PhoneNumber
  }

  input TripCreateInput {
    creator: String!
    booked: Boolean!
    startLocation: String!
    endLocation: String!
    startDate: DateTime!
    destinations: [String!]!
    flights: [FlightInput!]!
    currency: Currency!
    price: PositiveInt!
  }

  input TripUpdateInput {
    _id: ID!
    creator: String!
    booked: Boolean
    startLocation: String
    endLocation: String
    startDate: DateTime
    destinations: [String!]
    flights: [FlightInput!]
    currency: Currency
    price: PositiveInt
  }

  input FlightInput {
    origin: String!
    destination: String!
    departureDate: DateTime!
    arrivalDate: DateTime!
    airline: String!
    currency: Currency!
    price: PositiveInt!
  }
`;
