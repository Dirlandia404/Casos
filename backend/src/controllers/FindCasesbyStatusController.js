const connection = require('../database/connection');
module.exports = {

 async index(request, response) {
   const [count] = await connection('cases').count();
   const { status, page = 1 } = request.query;
   //const { status } = request.params;

   const users = await connection('users')
      .join('cases', 'users.id', '=', 'cases.user_id')
      .where('status', '=', status)
      .limit(5)
      .offset((page-1)*5)
      .select([
      'cases.*',
      'users.name',
      'users.email',
      'users.whatsapp',
      'users.city',
      'users.uf',
    ]);
    
    response.header('X-Total-Count', count["count"]);
    return response.json(users);
  },
};