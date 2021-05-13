const
  Validator = require('validator'),  
  isEmpty = require('./isEmpty')

module.exports = function validateProfileInput (data) {
  let errors = {}
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.company = !isEmpty(data.company) ? data.company : ''
  data.location = !isEmpty(data.location) ? data.location : ''

//Company  
  if (!Validator.isLength(data.handle, {min:2 , max: 40})) {
    errors.handle = 'Handle need to be exist'
  }
  if(Validator.isEmpty(data.handle)) {errors.handle = 'Profile Handle is required'}
 
  //Company  
  if (!Validator.isLength(data.company, {min:2 , max: 30})) {
    errors.company = 'Company minimum length 2 & maximum 30 char'
  }
  if(Validator.isEmpty(data.company)) {errors.company = 'Company field is required'}
  

  //Location
  if (!Validator.isLength(data.location, {min:2 , max: 30})) {
    errors.location = 'Company minimum length 2 & maximum 30 char'
  }
  if(Validator.isEmpty(data.location)) {errors.location = 'Location field is required'}    

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

