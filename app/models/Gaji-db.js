const knex = require('./knex-db'); // the connection!

module.exports = {
  getAll() {
    return knex('salary').orderBy('dt_salary','asc')   
  },  
  getById(id) {
    return knex('salary').where('salary_id', id).first()
  },
  create(data) {
     return knex('salary').insert(data, '*');
  },  
  update(salaryId, descSal,amtSal) {    
    return knex('salary')
      .where('salary_id', salaryId)
      .update({desc_salary: descSal, amt_salary: amtSal})      
  },
  delete(id) {
    return knex('salary').where('salary_id', id).del()
  }
}
