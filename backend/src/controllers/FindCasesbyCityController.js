    const connection = require('../database/connection');
    module.exports = {


     async index(request, response) {
       const count = await connection('cases').count();

       const page  = request.query['page'];
       const city = request.query['city'];

       const cases = await connection('users')
          .join('cases', 'users.id', '=', 'cases.user_id')
          .where({city})
          .limit(5)
          .offset((parseInt(page, 10)-1)*5)
          .select([
          'cases.*',
          'users.name',
          'users.email',
          'users.whatsapp',
          'users.city',
          'users.uf',
        ]);
        
          response.header('X-Total-Count', count[0]['count']);
        
      return response.json(cases);
    },

  };