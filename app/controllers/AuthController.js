require('dotenv').config();

const 
  express = require('express'),
  router = express.Router(),  
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  passport = require('passport'),
  config = require('../utils/Setting'),
  // dbConnect = require('../models/knex-db'), 
  queries = require('../models/User-db'),    
  validateLoginInput = require('../validation/Login')
  

router.post("/login", (req, res, next) => {
  const {errors, isValid} = validateLoginInput(req.body)
  const {email,password} = req.body

    if (!isValid) {
      return res.status(400).json(config.rest.createResponse(400, false, undefined, errors))
    } else {
     // dbConnect("users")
     // .where({email: req.body.email})
     // .first()
     queries.goLoginByEmail(email)
     .then(user => {
        if(!user){         
          res.status(401).json(config.rest.createResponse(401, false, undefined, "No user "+email+"Authentication error"))
        } else {

          if (user.is_active == 'Y') { // User status should be ACTIVE
            return bcrypt
            .compare(req.body.password, user.password)
              .then(isAuthenticated => {
                if(!isAuthenticated){                 
                   res.status(401).json(config.rest.createResponse(401, false, undefined, "Wrong password!"))
                } else {
                  return jwt.sign(user, process.env.JWT_SECRET, (error, token) => {                  
                    // res.json(config.rest.createResponse(200, true, {
                    //   // expiresIn: 60 * 30,
                    //   // expiresIn: 60 * 60,
                    //   exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    //   // username: user.username,
                    //   token: 'Bearer ' + token                  
                    // }))
                    // ------------Cookie
                    res.cookie('jwt', token, {                        
                        httpOnly: true,        
                        maxAge: 60 * 60 // 1 day
                    })

                    res.json(config.rest.createResponse(200, true, {
                      // expiresIn: 60 * 30,
                      // expiresIn: 60 * 60,
                      exp: 60 * 60,
                      username: user.username,
                      token: 'Bearer ' + token                  
                    }))
                  })                
                }
             })
        } else {
          return res.status(401).json(config.rest.createResponse(401, false, undefined, "User "+user.username+" is not activated"))
        }
      }

     })
     .catch(err => {
        res.status(401).json(config.rest.createResponse(401, false, undefined, "username "+email+" not found, Authentication error"))      
     })
   }
})

router.post("/logout", (req, res, next) => {
  res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'Logout success'
    })
})

router.get("/verify", (req, res, next) => {
   const token = req.headers.authorization.split(' ')[1]
   jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if(error){
         res.status(401).json({
            message: "Unauthorized Access!"
         })
      } else {        
        // Further check into DB
        queries.goLoginByUsername(decodedToken.username)
          .then(user => {
          if (user) {
            //res.json(config.rest.createResponse(200, true, {user_id: decodedToken.expiresIn, token: token}))
            res.json(config.rest.createResponse(200, true, {id: decodedToken.user_id, token: token}))
          } else {        
            res.status(401).json(config.rest.createResponse(401, false, undefined, 'User not found'))          
          }
        })

        //  res.status(200).json({
        //     // id: decodedToken.id_user,
        //     username: decodedToken.username
        // })
      }
   })
})

module.exports = router