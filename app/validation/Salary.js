const
  Validator = require('validator'),  
  isEmpty = require('./isEmpty')

module.exports = function validateSalaryInput (data) {
  let errors = {}
  data.user_id = !isEmpty(data.user_id) ? data.user_id : ''
  data.dt_salary = !isEmpty(data.dt_salary) ? data.dt_salary : ''
  data.desc_salary = !isEmpty(data.desc_salary) ? data.desc_salary : ''
  data.amt_salary = !isEmpty(data.amt_salary) ? data.amt_salary : ''
  
  // User_Id
  if(Validator.isEmpty(data.user_id)) {errors.user_id = 'User ID field is required'}

  // Date
  if(Validator.isEmpty(data.dt_salary)) {errors.dt_salary = 'Date field is required'}

  //Description
  if (!Validator.isLength(data.desc_salary, {min:2 , max: 256})) {
    errors.desc_salary = 'Description minimum length 2 & maximum 256 char'
  }
  if(Validator.isEmpty(data.desc_salary)) {errors.desc_salary = 'Description field is required'}

  //amt_salary
  if (!Validator.isLength(data.amt_salary, {min:2 , max: 256})) {
    errors.amt_salary = 'Amount must be integer'
  }  
  if(Validator.isEmpty(data.amt_salary)) {errors.amt_salary = 'Amount field is required'}

  return {
    errors,
    isValid: isEmpty(errors)
  }
}