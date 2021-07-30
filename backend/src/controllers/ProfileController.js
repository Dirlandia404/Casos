const connection = require('../database/connection');
//casos especifico de uma unica ong
module.exports = {
  async index(request, response) {
    const user_id = request.headers.authorization;
    const cases = await connection('cases')
      .where('user_id', user_id)
      .select(
        'cases.id', 
        'cases.title', 
        'cases.status', 
        'cases.description', 
        'cases.value', 
        'cases.user_id', 
        );
      //.select('*');

    return response.json(cases);
  },
};