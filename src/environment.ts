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
  mailgun: {
    apikey: string,
    domain: string,
    test: boolean,
  };
  twilio: {
    sid: string,
    token: string,
    phoneNumber: string,
  };
  secret: string;
  saltRound: number;
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
  mailgun: {
    apikey: process.env.MAILGUN_API_KEY || '',
    domain: process.env.MAILGUN_DOMAIN || '',
    test:  process.env.MAILGUN_TEST === 'true' || true,
  },
  twilio: {
    sid: process.env.TWILIO_SID || '',
    token: process.env.TWILIO_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONENUMBER || '',
  },
  secret: process.env.SECRETKEY || 'No saved secret!',
  saltRound: parseInt(process.env.SALTROUND || '10'),
  port: process.env.PORT || defaultPort,
};
