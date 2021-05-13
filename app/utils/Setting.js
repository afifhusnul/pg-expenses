'use strict'
require('dotenv').config();
// generate token using secret from process.env.JWT_SECRET
const jwt = require('jsonwebtoken');

module.exports.rest = {

  createResponse: (code, success, response, errorDescription, errorCode) => {
    const newResponse = {
      meta: {
        code: code,
        success: success,
        errorDescription: errorDescription
      },
      response: response
    }

    if (errorCode) {
      newResponse.meta.errorCode = errorCode
      // newResponse.meta.errorTitle = errorTitle
    }

    return newResponse
  }  
}

module.exports.statusCode = {
  success: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  forbidden: 403,
  serverError: 500
}


// generate token and return it
module.exports.genToken = {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  generateToken(user) {
    if (!user) return null;
    var u = {
      userId: user.userId,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin
    };

    return jwt.sign(u, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
  }
}

// return basic user details
module.exports.getCleanUser = {
  getCleanUser(user) {
    if (!user) return null;

    return {
      userId: user.userId,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin
    };
  }
}

