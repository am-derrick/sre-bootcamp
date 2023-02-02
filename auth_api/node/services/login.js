const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secretKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW';

const users = [
  {
    username: 'admin',
    password: 'secret'
  },
  {
    username: 'noadmin',
    password: 'noPow3r'
  },
  {
    username: 'bob',
    password: 'thisIsNotAPasswordBob'
  }
];

const saltedHash = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
}

export const loginFunction = (username, password) => {
  
  // checks for the username
  const validateUser = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(403).send('Cannot find user');
    }

    // salts and hashes password
    const salt = username + secretKey;
    const hashedPass = saltedHash(password, salt);

    // validates password
    if (user.password !== hashedPass) {
      return res.status(403).send('Wrong password');
    }
    next();
  }

  // logs in the user
  app.post('/login', validateUser, (req, res) => {
    const {username} = req.body;
    const token = jwt.sign({ username }, secretKey, { expiresIn: '48h' });
    res.send({ token });
  })
}
