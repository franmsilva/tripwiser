import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};






export type Query = {
  __typename?: 'Query';
  login: User;
  logout: User;
  places: Array<Place>;
};


export type QueryLoginArgs = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};


export type QueryLogoutArgs = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};


export type QueryPlacesArgs = {
  cityNameSearch: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: User;
  updateUser: User;
  createTrip: User;
  updateTrip: Trip;
  deleteTrip: Scalars['Boolean'];
};


export type MutationRegisterUserArgs = {
  userDetails?: Maybe<UserRegisterInput>;
};


export type MutationUpdateUserArgs = {
  email?: Maybe<Scalars['EmailAddress']>;
  password?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};


export type MutationCreateTripArgs = {
  tripInput?: Maybe<TripCreateInput>;
};


export type MutationUpdateTripArgs = {
  _id: Scalars['ID'];
  booked: Scalars['Boolean'];
};


export type MutationDeleteTripArgs = {
  tripId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  trips: Array<Maybe<Trip>>;
  token?: Maybe<Scalars['String']>;
};

export type Trip = {
  __typename?: 'Trip';
  _id: Scalars['ID'];
  creator: Scalars['ID'];
  booked: Scalars['Boolean'];
  startLocation: Place;
  endLocation: Place;
  startDate: Scalars['DateTime'];
  destinations: Array<Place>;
  flights: Array<Flight>;
  currency: Scalars['Currency'];
  price: Scalars['PositiveInt'];
};

export type Flight = {
  __typename?: 'Flight';
  _id: Scalars['ID'];
  origin: Place;
  destination: Place;
  departureDate: Scalars['DateTime'];
  arrivalDate: Scalars['DateTime'];
  airline: Scalars['String'];
  currency: Scalars['Currency'];
  price: Scalars['PositiveInt'];
};

export type Place = {
  __typename?: 'Place';
  _id: Scalars['ID'];
  airportId: Scalars['String'];
  airportName: Scalars['String'];
  location: Scalars['String'];
  cityId: Scalars['String'];
  cityName: Scalars['String'];
  countryId: Scalars['String'];
  countryName: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

export type UserUpdateInput = {
  email?: Maybe<Scalars['EmailAddress']>;
  password?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

export type TripCreateInput = {
  creator: Scalars['String'];
  booked: Scalars['Boolean'];
  startLocation: Scalars['String'];
  endLocation: Scalars['String'];
  startDate: Scalars['DateTime'];
  destinations: Array<Scalars['String']>;
  flights: Array<FlightInput>;
  currency: Scalars['Currency'];
  price: Scalars['PositiveInt'];
};

export type TripUpdateInput = {
  _id: Scalars['ID'];
  creator: Scalars['String'];
  booked?: Maybe<Scalars['Boolean']>;
  startLocation?: Maybe<Scalars['String']>;
  endLocation?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  destinations?: Maybe<Array<Scalars['String']>>;
  flights?: Maybe<Array<FlightInput>>;
  currency?: Maybe<Scalars['Currency']>;
  price?: Maybe<Scalars['PositiveInt']>;
};

export type FlightInput = {
  origin: Scalars['String'];
  destination: Scalars['String'];
  departureDate: Scalars['DateTime'];
  arrivalDate: Scalars['DateTime'];
  airline: Scalars['String'];
  currency: Scalars['Currency'];
  price: Scalars['PositiveInt'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  User: ResolverTypeWrapper<User>;
  Trip: ResolverTypeWrapper<Trip>;
  Flight: ResolverTypeWrapper<Flight>;
  Place: ResolverTypeWrapper<Place>;
  UserRegisterInput: UserRegisterInput;
  UserUpdateInput: UserUpdateInput;
  TripCreateInput: TripCreateInput;
  TripUpdateInput: TripUpdateInput;
  FlightInput: FlightInput;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  PhoneNumber: Scalars['PhoneNumber'];
  Currency: Scalars['Currency'];
  PositiveInt: Scalars['PositiveInt'];
  Query: {};
  String: Scalars['String'];
  Mutation: {};
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  User: User;
  Trip: Trip;
  Flight: Flight;
  Place: Place;
  UserRegisterInput: UserRegisterInput;
  UserUpdateInput: UserUpdateInput;
  TripCreateInput: TripCreateInput;
  TripUpdateInput: TripUpdateInput;
  FlightInput: FlightInput;
  Upload: Scalars['Upload'];
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryLogoutArgs, 'email' | 'password'>>;
  places?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType, RequireFields<QueryPlacesArgs, 'cityNameSearch'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  registerUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, never>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, never>>;
  createTrip?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateTripArgs, never>>;
  updateTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationUpdateTripArgs, '_id' | 'booked'>>;
  deleteTrip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTripArgs, 'tripId'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  trips?: Resolver<Array<Maybe<ResolversTypes['Trip']>>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TripResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trip'] = ResolversParentTypes['Trip']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  booked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startLocation?: Resolver<ResolversTypes['Place'], ParentType, ContextType>;
  endLocation?: Resolver<ResolversTypes['Place'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  destinations?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType>;
  flights?: Resolver<Array<ResolversTypes['Flight']>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type FlightResolvers<ContextType = any, ParentType extends ResolversParentTypes['Flight'] = ResolversParentTypes['Flight']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Place'], ParentType, ContextType>;
  destination?: Resolver<ResolversTypes['Place'], ParentType, ContextType>;
  departureDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  arrivalDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  airline?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  airportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  airportName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Trip?: TripResolvers<ContextType>;
  Flight?: FlightResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
