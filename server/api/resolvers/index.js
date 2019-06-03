const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const authMutations = require('./auth');
const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Date: DateScalar,
    Query: {
      async viewer(parent, args, { token }, info) {
        try {
          const viewer = token
            ? jwt.verify(token, app.get('JWT_SECRET'))
            : null;
          return viewer;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }) {
        try {
          return await pgResource.getItems(filter);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, args, { pgResource }) {
        try {
          return await pgResource.getTags();
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    User: {
      async items({ id }, args, { pgResource }) {
        try {
          return await pgResource.getItemsForUser(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrowed({ id }, args, { pgResource }) {
        try {
          return await pgResource.getBorrowedItemsForUser(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    Item: {
      async itemowner({ ownerid }, args, { pgResource }) {
        try {
          return await pgResource.getUserById(ownerid);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags({ id }, args, { pgResource }) {
        try {
          return await pgResource.getTagsForItem(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower({ borrowerid }, args, { pgResource }) {
        try {
          return await pgResource.getUserById(borrowerid);
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    Mutation: {
      ...authMutations(app),

      async addItem(parent, { item }, { pgResource, token }, info) {
        try {
          const user = token
            ? jwt.verify(token, app.get('JWT_SECRET'))
            : undefined;
          const newItem = await pgResource.saveNewItem({
            item: item,
            user: user ? user.id : ''
          });
          return newItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    }
  };
};
