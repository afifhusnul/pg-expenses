require('dotenv').config();

const 
  express = require('express'),
  router = express.Router(),  
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  passport = require('passport'),
  config = require('../utils/Setting'),
  knex = require('../models/knex-db'),
  queries = require('../models/User-db'),
  auth = require('../middleware/AuthMiddleware'),
  validateRegisterInput = require('../validation/Register')  


/* GET users listing. */
router.get('/', (req, res, next) => {
  try {
    // statements
    // const users = await knex('users').select(['id_user','username','email']);
    // const users = await knex('users').select(['*']);
    // return res.json(config.rest.createResponse(200, true, users));
    queries.getAll().then(users => {
        res.json(config.rest.createResponse(200, true, users));
    });    
  } catch(e) {    
    if (e) {
      res.status(500).json(config.rest.createResponse(500, false, e));
    } else {
      next(res.status(500).json(config.rest.createResponse(500, false, e)))
    }
  }  
});


/* GET User Profile . */
router.get('/:id', auth, (req, res, next) => {
    queries.goLoginByUsername(req.params.id)
      .then(user => {
        if (user) {
          res.json(config.rest.createResponse(200, true, user))
        } else {        
          res.status(400).json(config.rest.createResponse(400, false, undefined, 'User not found'))          
        }
    })    
})

/* POST New user registration */
router.post('/register', (req,res,next) => {

    const {errors, isValid} = validateRegisterInput(req.body)
    if (!isValid) {
      return res.status(400).json(config.rest.createResponse(400, false, undefined, errors))
    } else {

      const { username,email,password } = req.body
            
      bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(password, salt, (err,hash) => {          
          // Save data
          queries.create({username: username, email: email, password: hash})
            .then(user => {
              if (user) {
                res.json(config.rest.createResponse(200, true, user));
              } else {
                res.status(500).json(config.rest.createResponse(500, false, undefined, "Error create new user"))
              }
      
            }).catch(err =>
              res.status(400).json(config.rest.createResponse(400, false, undefined, err.detail))              
            )                                
        })
      })
    }  
})

/* UPDATE password */
router.put('/updatepwd/:id', auth, (req,res,next) =>{
    
    const {password} = req.body

    bcrypt.genSalt(10, (err,salt) => {
      bcrypt.hash(password, salt, (err,hash) => { 
        // Update password
        queries.updatePwd(req.params.id, hash)
          .then(user => {
            if (user) {                
              res.json(config.rest.createResponse(200, true, 'Update password success'));
            } else {
              console.log(hash)
              res.status(500).json(config.rest.createResponse(500, false, undefined, "User not found"))
            }            
          }).catch(err =>
            res.status(400).json(config.rest.createResponse(400, false, undefined, err))
          )                                
      })
      
    }) 

})

/* DELETE user login */
router.delete('/:id', auth, (req,res,next) => {
  const idUser = req.params.id
  queries.delete(idUser)
    .then(user => {
      if (user) {
        res.json(config.rest.createResponse(200, true, "Delete user "+idUser+" Success"));    
      } else {
        res.status(400).json(config.rest.createResponse(400, false, undefined, "User id "+req.params.id+" not found"))
      }        
    }).catch(err =>    
      res.status(400).json(config.rest.createResponse(400, false, undefined, err))
    ) 

})

module.exports = router;