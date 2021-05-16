const knex = require('./knex-db'); // the connection!

module.exports = {
  getAll() {
    return knex('expenses').orderBy('dt_exp','asc')   
  },
  getById(id) {
    return knex('expenses').where('exp_id', id).first()
  },
  getAllByUserIdAndDt(userId,dt1,dt2) {
    return knex('expenses').whereBetween('dt_exp', [dt1,dt2]).where({user_id: userId})
    //.orderBy('dt_exp','asc')
  },
  // getAllByUserId(userId) {
  //   return knex('expenses').where('user_id', userId).orderBy('dt_exp','asc')
  // },  
  getAllByUserId(userId) {
    return knex.select('user_id','dt_exp').from('expenses').where('user_id', userId).orderBy('dt_exp','asc')
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
