const defaultPort = 4000;

interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  database: {
    uri: string;
    config: {
      useNewUrlParser: boolean;
      useCreateIndex: boolean;
      useFindAndModify: boolean;
      useUnifiedTopology: boolean;
    };
  };
  port: number | string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  database: {
    uri: process.env.DB_URI || '',
    config: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  },
  port: process.env.PORT || defaultPort,
};
