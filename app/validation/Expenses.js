const
  Validator = require('validator')  
  isEmpty = require('./isEmpty')

// module.exports = function validateExpensesInput(data) {
//   let errors = {}
//   data.user_id = !isEmpty(data.user_id) ? data.user_id : ''
//   data.salary_id = !isEmpty(data.salary_id) ? data.salary_id : ''
//   data.dt_exp = !isEmpty(data.dt_exp) ? data.dt_exp : ''
//   data.desc_exp = !isEmpty(data.desc_exp) ? data.desc_exp : ''
//   data.amt_exp = !isEmpty(data.amt_exp) ? data.amt_exp : ''
//   
//   // User_Id
//   if(Validator.isEmpty(data.user_id)) {errors.user_id = 'User ID field is required'}  
// 
//   // Salary_Id
//   if(Validator.isEmpty(data.salary_id)) {errors.salary_id = 'Salary ID field is required'}    
// 
//   // Date
//   if(Validator.isEmpty(data.dt_exp)) {errors.dt_exp = 'Date field is required'}
// 
//   //Description
//   if (!Validator.isLength(data.desc_exp, {min:2 , max: 256})) {
//     errors.desc_exp = 'Description minimum length 2 & maximum 256 char'
//   }
//   if(Validator.isEmpty(data.desc_exp)) {errors.desc_exp = 'Description field is required'}
// 
//   //amt_salary
//   
//   if (!Validator.isNumeric(data.amt_exp)) {
//     errors.amt_exp = 'Amount must be integer'
//   }  
//   if(Validator.isEmpty(data.amt_exp)) {errors.amt_exp = 'Amount field is required'}  
// 
//   return {
//     errors,
//     isValid: isEmpty(errors)
//   }
// }

module.exports.validInput = {

  validateNewData: (data) => {
    let errors = {}
    data.user_id = !isEmpty(data.user_id) ? data.user_id : ''
    data.salary_id = !isEmpty(data.salary_id) ? data.salary_id : ''
    data.dt_exp = !isEmpty(data.dt_exp) ? data.dt_exp : ''
    data.desc_exp = !isEmpty(data.desc_exp) ? data.desc_exp : ''
    data.amt_exp = !isEmpty(data.amt_exp) ? data.amt_exp : ''
    
    // User_Id
    if(Validator.isEmpty(data.user_id)) {errors.user_id = 'User ID field is required'}  

    // Salary_Id
    if(Validator.isEmpty(data.salary_id)) {errors.salary_id = 'Salary ID field is required'}    

    // Date
    if(Validator.isEmpty(data.dt_exp)) {errors.dt_exp = 'Date field is required'}

    //Description
    if (!Validator.isLength(data.desc_exp, {min:2 , max: 256})) {
      errors.desc_exp = 'Description minimum length 2 & maximum 256 char'
    }
    if(Validator.isEmpty(data.desc_exp)) {errors.desc_exp = 'Description field is required'}

    //amt_salary
    
    if (!Validator.isNumeric(data.amt_exp)) {
      errors.amt_exp = 'Amount must be integer'
    }  
    if(Validator.isEmpty(data.amt_exp)) {errors.amt_exp = 'Amount field is required'}  

    return {
      errors,
      isValid: isEmpty(errors)
    }
  },

  validateSearch: (data) => {
    let errors = {}
    data.user_id = !isEmpty(data.user_id) ? data.user_id : ''
    data.start_dt = !isEmpty(data.start_dt) ? data.start_dt : ''
    data.end_dt = !isEmpty(data.end_dt) ? data.end_dt : ''
    
    // User_Id
    if(Validator.isEmpty(data.user_id)) {errors.user_id = 'User ID field is required'}

    // StartDate
    if(Validator.isEmpty(data.start_dt)) {errors.start_dt = 'Start date field is required'}  

    // StartDate
    if(Validator.isEmpty(data.end_dt)) {errors.end_dt = 'End date field is required'}
    
    return {
      errors,
      isValid: isEmpty(errors)
    }
  },

  validateUpdate: (data) => {
    let errors = {}
    //data.user_id = !isEmpty(data.user_id) ? data.user_id : ''
    data.desc_exp = !isEmpty(data.desc_exp) ? data.desc_exp : ''
    data.amt_exp = !isEmpty(data.amt_exp) ? data.amt_exp : ''
    
    User_Id
    if(Validator.isEmpty(data.user_id)) {errors.user_id = 'User ID field is required'}

    // Description
    if(Validator.isEmpty(data.desc_exp)) {errors.desc_exp = 'Description field is required'}  

    // Amount
    if (!Validator.isNumeric(data.amt_exp)) {
      errors.amt_exp = 'Amount must be integer'
    }  
    if(Validator.isEmpty(data.amt_exp)) {errors.amt_exp = 'Amount field is required'}  
    
    return {
      errors,
      isValid: isEmpty(errors)
    }
  }
}
