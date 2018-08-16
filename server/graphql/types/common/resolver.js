const { GraphQLDateTime } = require('graphql-iso-date');
const { GraphQLUpload } = require('apollo-upload-server');

module.exports = {
  resolver: {
    DateTime: GraphQLDateTime,
    Upload: GraphQLUpload
  }
};
