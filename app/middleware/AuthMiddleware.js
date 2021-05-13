require('dotenv').config()

const 
  jwt = require('jsonwebtoken'),
  config = require('../utils/Setting')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      //throw 'Invalid user ID';
      res.status(401).json(config.rest.createResponse(401, false, undefined, 'Unauthorized Access!'))
    } else {
      next()
    }
  } catch {
    res.status(401).json(config.rest.createResponse(401, false, undefined, 'Unauthorized Access!'))
  }
};