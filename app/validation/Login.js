const
  Validator = require('validator'),  
  isEmpty = require('./isEmpty')

module.exports = function validateLoginInput (data) {
  let errors = {}    
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

 
  //Email  
  if(Validator.isEmpty(data.email)) {errors.email = 'Email field is required'}
  if(!Validator.isEmail(data.email)) {errors.email = 'Email format is invalid'}    

  //Password
  if (!Validator.isLength(data.password, {min:2 , max: 30})) {
    errors.password = 'Password minimum length 2 & maximum 30 char'
  }
  if(Validator.isEmpty(data.password)) {errors.password = 'Password field is required'}    

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

