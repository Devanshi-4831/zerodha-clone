// backend/util/SecretToken.js
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET || 'defaultSecret', {
    expiresIn: 3 * 24 * 60 * 60, // 3 days
  });
};

module.exports = { createSecretToken };
