const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mysql = require('mysql'); 
const util = require('util');

import 'regenerator-runtime/runtime';

// should I put this in a .env? It's not wise to share secret keys in a public repo
const secretKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW'

export const loginFunction = async (username, password) => {

  // mysql database details
  const connection = mysql.createConnection({
    host: 'sre-bootcamp-selection-challenge.cabf3yhjqvmq.us-east-1.rds.amazonaws.com',
    user: 'secret',
    password: 'jOdznoyH6swQB9sTGdLUeeSrtejWkcw',
    database: 'bootcamp_tht',
  });

  // connect to database
  connection.connect();

  // query database for username, password, salt, role
  connection.query = util.promisify(connection.query);
  try {
    const queried = await connection.query(
      "SELECT username, password, salt, role FROM users WHERE username = ?", [username]
    );

    const obj = queried[0];

    //hash with the SHA512 Algorithm and append salted value
    const hashed = crypto.createHash('sha512').update(password + obj.salt).digest('hex');

    if(!hashed.localeCompare(obj.password)){
      const token = jwt.sign({ role: obj.role}, secretKey, { expiresIn: '10m' });
      return token;
    }
    return null;

  } catch (e) {
    console.error(e)
  }

  // close connection
  connection.end();
}
