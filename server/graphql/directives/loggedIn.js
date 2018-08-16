/* eslint-disable no-param-reassign */
const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class LoggedInDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    field.requiresLogIn = true;
    this.constructor.ensureFieldsWrapped(details.objectType);
  }

  visitObject(type) {
    type.requiresLogIn = true;
    this.constructor.ensureFieldsWrapped(type);
  }

  static ensureFieldsWrapped(type) {
    if (type.loginWrapped) return;
    type.loginWrapped = true;

    Object.values(type.getFields()).forEach(field => {
      const { resolve = defaultFieldResolver } = field;
      const requiresLogIn = type.requiresLogIn || field.requiresLogIn;
      if (requiresLogIn) {
        field.resolve = function loggedInResolver(root, args, ctx, ...rest) {
          if (requiresLogIn && !ctx.user) {
            throw new Error('You must be logged in to access this data');
          }
          return resolve.call(this, root, args, ctx, ...rest);
        };
      }
    });
  }
}

module.exports = LoggedInDirective;
