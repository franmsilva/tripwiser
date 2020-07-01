"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
var defaultPort = 4000;
exports.environment = {
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
    secret: process.env.SECRETKEY || 'No saved secret!',
    saltRound: parseInt(process.env.SALTROUND || '10'),
    port: process.env.PORT || defaultPort,
};
