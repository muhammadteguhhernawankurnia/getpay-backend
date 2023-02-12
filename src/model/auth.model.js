//model berkaitan dengan database
const db = require('../helper/connection');
const { v4: uuidv4 } = require('uuid');

const authModel = {
  //data auth dll dari body
  login: ({ email, password }) => {
    //cek email dan password ada?
    console.log(email, password);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_getpay WHERE email='${email}' AND password='${password}'`,
        (err, result) => {
          if (err) {
            return reject({
              message: err.message,
            });
          } else {
            if (result.rows.length == 0) {
              return reject('email/password salah');
            } else {
              return resolve(result.rows[0]);
            }
            // return resolve(result.rows);
          }
        }
      );
    });
  },

  register: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO user_getpay (user_id, email, password)  VALUES ('${uuidv4()}','${email}','${password}')`,
        (err, result) => {
          if (err) {
            return reject({
              message: err.message,
            });
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },
};

module.exports = authModel;
