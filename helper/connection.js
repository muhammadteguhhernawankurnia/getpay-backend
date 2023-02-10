//koneksi ke pg dengan npm pg dan dokumentasi di node pg
const { Client } = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'getpay',
  password: '0227814081',
  port: 5432,
});

//client conect ngambil dari const client = new client dan cek koneksi db
db.connect((err) => {
  if (!err) {
    console.log('database berhasil tersambung');
  } else {
    console.log('database error connection', err);
  }
});

//ekspor db untuk string dipake di luar
module.exports = db;
