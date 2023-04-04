const jwt = require('jsonwebtoken');

const createJWTToken = (user) => {
    return jwt.sign({ user }, `${process.env.SECRET_KEY_JWT}`, {
      expiresIn: "24h",
    });
}

module.exports = {createJWTToken};