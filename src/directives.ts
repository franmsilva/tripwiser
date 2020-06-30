import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';

export class Authentication extends SchemaDirectiveVisitor {
    visitFieldDefinition(field : GraphQLField<any,any>) {
        const resolver = field.resolve || defaultFieldResolver
        
        field.resolve = async (root, args, ctx, info) => {
            
            if (!ctx.user) {
                throw new AuthenticationError('not auth');
            }
            return resolver(root, args, ctx, info);
        }
    }
}