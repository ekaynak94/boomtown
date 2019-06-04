module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname,email,password) VALUES ($1,$2,$3) RETURNING *',
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email=$1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id=$1',
        values: [id]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid != $1`,
          values: idToOmit ? [idToOmit] : []
        });
        return items.rows;
      } catch (e) {
        throw 'Error';
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid=$1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw 'Error';
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrowerid=$1;`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw 'Error';
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query('SELECT * FROM tags');
        return tags.rows;
      } catch (e) {
        throw 'Error';
      }
    },
    async getTagsForItem(id) {
      try {
        const tagsQuery = {
          text: `SELECT * FROM tags INNER JOIN itemtags ON tags.id=itemtags.tagid WHERE itemtags.itemid=$1`, // @TODO: Advanced queries
          values: [id]
        };
        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (e) {
        throw 'Error';
      }
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              const { title, description, tags } = item;
              const newItemQuery = {
                text: `INSERT INTO items (title,description,ownerid) VALUES ($1,$2,$3) RETURNING *`,
                values: [title, description, user]
              };
              const newItem = await client.query(newItemQuery);

              const itemId = newItem.rows[0].id;
              const tagsQueryString = tags
                .map(tag => `(${tag.id},${itemId})`)
                .join(',');

              await client.query(
                `INSERT INTO itemtags(tagid, itemid) VALUES ${tagsQueryString}`
              );

              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    },
    async borrowItem({ id, user }) {
      const borrowItemQuery = {
        text:
          'UPDATE items SET borrowerid=$1 WHERE borrowerid IS NULL AND id=$2 RETURNING borrowerid',
        values: [user, id]
      };
      try {
        const borrower = await postgres.query(borrowItemQuery);
        return borrower.rows[0];
      } catch (e) {
        throw 'Error';
      }
    }
  };
};
