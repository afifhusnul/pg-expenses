const knex = require('./knex-db'); // the connection!

module.exports = {
  getAll() {
    return knex('expenses').orderBy('dt_exp','asc')   
  },  
  getById(id) {
    return knex('expenses').where('exp_id', id).first()
  },
  create(data) {
     return knex('expenses').insert(data, '*');
  },  
  update(Id, descExp,amtExp) {    
    return knex('expenses')
      .where('exp_id', Id)
      .update({desc_exp: descExp, amt_exp: amtExp})      
  },
  delete(id) {
    return knex('expenses').where('exp_id', id).del()
  }
}
