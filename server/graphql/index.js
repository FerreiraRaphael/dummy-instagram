const glue = require('schemaglue');
const { makeExecutableSchema } = require('graphql-tools');
const schemaDirectives = require('./directives');

const createSchema = async () => {
  const { schema, resolver } = glue('graphql/types');
  return makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolver,
    schemaDirectives
  });
};

module.exports = createSchema;
