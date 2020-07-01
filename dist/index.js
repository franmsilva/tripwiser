"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var graphql_scalars_1 = require("graphql-scalars");
var auth_1 = require("./auth");
var directives_1 = require("./directives");
var environment_1 = require("./environment");
var resolvers_1 = require("./resolvers");
var type_defs_1 = __importDefault(require("./type-defs"));
var server = new apollo_server_1.ApolloServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: type_defs_1.default,
    schemaDirectives: {
        authentication: directives_1.Authentication,
    },
    context: function (_a) {
        var req = _a.req;
        var token = req.headers.authorization;
        var user = auth_1.getUserFromToken(token);
        return { user: user };
    },
    mocks: {
        DateTime: graphql_scalars_1.DateTimeMock,
        EmailAddress: graphql_scalars_1.EmailAddressMock,
        PhoneNumber: graphql_scalars_1.PhoneNumberMock,
        Currency: graphql_scalars_1.CurrencyMock,
        PositiveInt: graphql_scalars_1.PositiveIntMock,
    },
    mockEntireSchema: false,
    introspection: environment_1.environment.apollo.introspection,
    playground: environment_1.environment.apollo.playground,
});
server
    .listen(environment_1.environment.port)
    .then(function (_a) {
    var url = _a.url;
    return console.log("Server ready at " + url + ".");
});
