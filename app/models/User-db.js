const knex = require('./knex-db'); // the connection!

module.exports = {
  getAll() {
    return knex('users')    
  },
  goLoginByEmail(email) {
    //return knex('users').where('email', email).where('is_active', 'Y').first()
    return knex('users').where('email', email).first()
  },
  goLoginByUsername(username) {
    return knex('users').where('username', username).first()    
  },  
  findById(id){
    return knex('users').where('user_id', id).first()
  },
  // // getStock(id, startDt, endDt) {
  //   return knex('stock_trx_idx')
  //   .where('id_ticker', id)
  //   .whereBetween('dt_trx', [startDt, endDt]);
  // },
  create(data) {
     return knex('users').insert(data, '*');
  },  
  updatePwd(id, pwd) {
    return knex('users').where('user_id', id).update({'password': pwd})    
  },
  updateLastLogin(id) {
    return knex('users').where('user_id', id).update({'last_login': now})    
  },
  update(id, data) {
    return knex('users').where('user_id', id).update(users, '*')
  },
  delete(id) {
    return knex('users').where('user_id', id).del()
  }
}
