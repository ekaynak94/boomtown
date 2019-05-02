/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")

const authMutations = require("./auth");
const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    
    //Date: DateScalar,
    Query: {
      viewer( parent, args, {token}, info) {
        if (token) return token;
        return null;
      }, async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      }, async items(parent, { filter }, { pgResource }) {
        try {
          return await pgResource.getItems(filter);
        } catch (e) {
          throw new ApolloError(e);
        }
      }, async tags(parent, args, { pgResource }) {
        try {
          return await pgResource.getTags();
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    User: { 
      async items({id}, args, { pgResource }) {
        try {
          return await pgResource.getItemsForUser(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      }, async borrowed({id}, args, { pgResource }) {
        try {
          return await pgResource.getBorrowedItemsForUser(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    Item: {
      async itemowner({ownerid}, args, { pgResource }) {
        try {
          return await pgResource.getUserById(ownerid);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags({id}, args, { pgResource }) {
        try {
          
          return await pgResource.getTagsForItem(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower({ borrowerid}, args, { pgResource }) {
        try {
          return await pgResource.getUserById(borrowerid);
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    Mutation: {
       ...authMutations(app),
  

      async addItem(parent, {item}, {pgResource,token}, info) {
        try {
          //const user = await jwt.decode(token, app.get('JWT_SECRET'));
          const newItem = await pgResource.saveNewItem({
            item: item,
            user:token.id
          });
        return newItem;
        } catch (e) {
          throw new ApolloError(e);
        }
       
      } } };
};
