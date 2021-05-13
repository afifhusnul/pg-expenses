const   
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  config = require('../utils/Setting'),
  User = require('../models/User-db')  


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET


module.exports = passport => {
  passport.use(    
    new JwtStrategy(opts, (jwtPayload, done) => {
    // console.log(jwtPayload)
    try {

      User.findById(jwtPayload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch( err => console.log(err))
      
    } catch(e) {
      // statements
      console.log(e);
    }
    // User.findById(jwtPayload.id)
    //   .then(user => {
    //     if (user) {
    //       return done(null, user)
    //     }
    //     return done(null, false)
    //   })
    //   .catch( err => console.log(err))
  })
  )
}
