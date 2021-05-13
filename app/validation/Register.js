const
  Validator = require('validator'),  
  isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput (data) {
  let errors = {}
  // data.fullname = !isEmpty(data.fullname) ? data.fullname : ''
  data.username = !isEmpty(data.username) ? data.username : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  //Fullname
  // if (!Validator.isLength(data.fullname, {min:4 , max: 50})) {
  //   errors.fullname = 'Fullname minimum length 4 & maximum 30 char'
  // }  
  // if(Validator.isEmpty(data.fullname)) {errors.fullname = 'Fullname field is required'}

  //Username
  if (!Validator.isLength(data.username, {min:4 , max: 8})) {
    errors.username = 'Username minimum length 4 & maximum 8 char'
  }
  if(Validator.isEmpty(data.username)) {errors.username = 'Username field is required'}

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

