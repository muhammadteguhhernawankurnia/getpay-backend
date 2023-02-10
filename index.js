const { urlencoded, json } = require('express');
const express = require('express');
const app = express();
//manggil db koneksi
const db = require('./helper/connection');

const { v4: uuidv4 } = require('uuid');

//defaultnya express js itu tidak menerima semua jenis form
//menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
//menerima json
app.use(json());

//endpoint
app.get('/transactions', (req, res) => {
  db.query(`SELECT * from transaction`, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: err.message,
      });
    } else {
      return res.status(200).send({ message: 'success', data: result.rows });
    }
  });
  // return res.json([
  //   {
  //     createdAt: '2022-12-23T06:55:05.831Z',
  //     name: 'Karla Pacocha',
  //     avatar:
  //       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1034.jpg',
  //     age: 64,
  //     country: 'Botswana',
  //     posisiton: 'Fresh',
  //     id: '1',
  //   },
  //   {
  //     createdAt: '2022-12-24T04:00:46.568Z',
  //     name: 'Susie Feil',
  //     avatar:
  //       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/522.jpg',
  //     age: 28,
  //     country: 'Eritrea',
  //     posisiton: 'consequently',
  //     id: '2',
  //   },
  // ]);
});

//res harus definisikan agar tidak error, :id(dinamis)=>params, bukan array of object
app.get('/transactions/:id', (req, res) => {
  //params dinamis
  const { id } = req.params;
  db.query(
    `SELECT * from transaction WHERE transaction_id='${id}'`,
    (err, result) => {
      if (err) {
        return res.status(500).send({
          message: err.message,
        });
      } else {
        return (
          res
            .status(200)
            // .send({ message: 'success', data: result.rows[0] });
            .send({ data: result.rows[0] })
        );
      }
    }
  );
  // return res.status(200).send({ message: 'success', data: req.body });
  // return res.json({
  //   createdAt: '2022-12-23T06:55:05.831Z',
  //   name: 'Karla Pacocha',
  //   avatar:
  //     'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1034.jpg',
  //   age: 64,
  //   country: 'Botswana',
  //   posisiton: 'Fresh',
  //   id: req.params.id, //cara ngambil dari params
  // });
});

//data diambil dari body di fe
app.post('/transactions', (req, res) => {
  //destructuring
  //transaction_id dari uuid
  const { user_id, wallet_id, total_transaction, description, created_at } =
    req.body;
  //deklarasi uuid
  // let uuid = uuidv4();
  //query langsung, sql language
  db.query(
    `INSERT INTO transaction (transaction_id, user_id, wallet_id, total_transaction, description, created_at) VALUES ('${uuidv4()}','${user_id}','${wallet_id}','${total_transaction}','${description}','${created_at}')`,
    (err, result) => {
      if (err) {
        return res.status(500).send({
          message: err.message,
        });
      } else {
        return res.status(201).send({ message: 'success', data: req.body });
      }
    }
  );
});

app.patch('/transactions/:id', (req, res) => {
  //ngambil dulu dari database berdasarkan id
  //kita update
  const { user_id, wallet_id, total_transaction, description } = req.body;
  const { id } = req.params;
  db.query(
    `SELECT * FROM transaction WHERE transaction_id='${id}'`,
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
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
              return res.status(500).send({ message: err.message });
            } else {
              return res
                .status(201)
                .send({ message: `success update data ${id}`, data: res.body });
            }
          }
        );
      }
    }
  );
});

app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    `DELETE from transaction WHERE transaction_id='${id}'`,
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        return res
          .status(201)
          .send({ message: `success delete data '${id}'`, data: {} });
      }
    }
  );
});

//get not found route
app.get('*', (req, res) => {
  return res.send({
    status: 404,
    message: 'page not found',
  });
});

//port untuk be biasanya di port 5000
app.listen(5002, () => {
  console.log('backend success running on port 5002');
});
