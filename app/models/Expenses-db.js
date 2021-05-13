const knex = require('./knex-db'); // the connection!

module.exports = {
  getAll() {
    return knex('expenses').orderBy('dt_expenses','asc')   
  },  
  getById(id) {
    return knex('expenses').where('expenses_id', id).first()
  },
  create(data) {
     return knex('expenses').insert(data, '*');
  },  
  update(expensesId, descExp,amtExp) {    
    return knex('expenses')
      .where('expenses_id', expensesId)
      .update({desc_expenses: descSal, amt_expenses: amtSal})      
  },
  delete(id) {
    return knex('expenses').where('expenses_id', id).del()
  }
}
