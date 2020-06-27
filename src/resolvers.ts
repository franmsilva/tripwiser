export default {
  // Resolver Args: root, args, context, info
  Query: {
    login: (): string => 'Hello World!',
  },
  Mutation: {
    register: (): string => 'Hello World!',
    updateUser: (): string => 'Hello World!',
    updateTrips: (): string => 'Hello World!',
  },
};
