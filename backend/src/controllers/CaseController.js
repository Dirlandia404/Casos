const connection = require('../database/connection');
module.exports = {

    async index(request, response) {
    try {
      const { page = 1 } = request.query;

      const count = await connection('cases').count();

      const cases = await connection('cases')
        .join('users', 'users.id', '=', 'cases.user_id')
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

       response.header('X-Total-Count', count[0]['count']);

      return response.json(cases);
    } catch (error) {
      return response.status(500).send()
    }

   },

  async create(request, response) {
    const { title, description, value, user_id, status } = request.body;

    const result = await connection('users')
    .select('users')
    .where('users.type', '=', 'ONG')
    .andWhere('users.id', user_id)
    .select('type').first();

    if(String(result) == 'undefined' || String(result) == '' || String(result) == '[]'){
         return response.status(401).json({ error: 'Operation not permitted' });
    }else{
      const novo = await connection('cases').insert({
      title,
      description,
      value,
      user_id,
      status,
    })

    return response.status(200).send('Caso cadastrado com sucesso');
      
    }

  },

  async update(request, response){
    try {
      const { id } = request.params;
      const {title, description, value, status} = request.body;
      const user_id = request.headers.authorization;

      const cases = await connection('cases')
        .where({ id })
        .select('user_id')
        .first();

      if (cases.user_id != user_id) {
        return response.status(401).json({ error: 'Operation not permitted' });
      }

      await connection('cases').where({id}).update({title, description, value, status})
      return response.status(204).send();

    } catch (error) {
      return response.status(500).send(error);
    }
  },
  
  async delete(request, response) {
    try {
      const { id } = request.params;
      const user_id = request.headers.authorization;

      const cases = await connection('cases')
      .where('id', id)
      .select('user_id')
      .first();

      if (cases.user_id != user_id) {
        return response.status(401).json({ error: 'Operation not permitted' });
      }

      await connection('cases').where({id}).delete();
      return response.status(204).send();

    } catch (error) {
      return response.status(500).send(error);
    }
  },
};
