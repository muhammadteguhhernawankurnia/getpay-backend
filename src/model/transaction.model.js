//model berkaitan dengan database
const db = require('../helper/connection');
const { v4: uuidv4 } = require('uuid');

const transactionModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from transaction`, (err, result) => {
        if (err) {
          return reject({
            message: err.message,
          });
        } else {
          return resolve({ message: 'success', data: result.rows });
        }
      });
    });
  },

  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from transaction WHERE transaction_id='${id}'`,
        (err, result) => {
          if (err) {
            return reject({
              message: err.message,
            });
          } else {
            return resolve({ data: result.rows[0] });
          }
        }
      );
    });
  },

  //data user id dll dari body
  add: ({ user_id, wallet_id, total_transaction, description, created_at }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO transaction (transaction_id, user_id, wallet_id, total_transaction, description, created_at) VALUES ('${uuidv4()}','${user_id}','${wallet_id}','${total_transaction}','${description}','${created_at}')`,
        (err, result) => {
          if (err) {
            return reject({
              message: err.message,
            });
          } else {
            return resolve({
              user_id,
              wallet_id,
              total_transaction,
              description,
              created_at,
            });
          }
        }
      );
    });
  },

  //update special case
  update: ({
    id,
    user_id,
    wallet_id,
    total_transaction,
    description,
    created_at,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM transaction WHERE transaction_id='${id}'`,
        (err, result) => {
          if (err) {
            return reject({ message: err.message });
          } else {
            db.query(
              `UPDATE transaction SET user_id='${
                user_id || result.rows[0].user_id
              }', wallet_id='${
                wallet_id || result.rows[0].wallet_id
              }',total_transaction='${
                total_transaction || result.rows[0].total_transaction
              }',description='${
                description || result.rows[0].description
              }' WHERE transaction_id='${id}'`,
              (err, result) => {
                if (err) {
                  return reject({ message: err.message });
                } else {
                  return resolve({
                    id,
                    user_id,
                    wallet_id,
                    total_transaction,
                    description,
                    created_at,
                  });
                }
              }
            );
          }
        }
      );
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE from transaction WHERE transaction_id='${id}'`,
        (err, result) => {
          if (err) {
            return reject({ message: err.message });
          } else {
            return resolve({
              message: `success delete data '${id}'`,
              data: {},
            });
          }
        }
      );
    });
  },
};

module.exports = transactionModel;
