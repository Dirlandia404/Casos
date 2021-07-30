const connection = require('../database/connection');
module.exports = {
  async index(request, response) {
    const users = await connection('users')
      .select('*')
    return response.json(users);
  },

  async create(request, response) {

    try{
      const { name, login, password, email, whatsapp, city, uf, type } =
      request.body;

      const user = await connection('users').insert({
        name,
        login,
        password,
        email,
        whatsapp,
        city,
        uf,
        type,
      });
      
    return response.json({ login });

    }catch(e){
      return response.status(500).send(error);
    }
    
  },

  async update(request, response){
    try {
      const {name, login, password, email, whatsapp, city, uf} = request.body;
      const { id } = request.params;
      const user = await connection('users')
        .update({name, login, password, email, whatsapp, city, uf})
        .where({ id })
        
       // console.log(user)
      if(user > 0){
        return response.status(204).send();
      }
      return response.status(401).json({ error: 'Operation not permitted' });
      
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const user = await connection('users')
        .where({ id })
        .delete();
        
        //console.log(user)
      if(user > 0){
        return response.status(204).send();
      }
      return response.status(401).json({ error: 'Operation not permitted' });
      
    } catch (error) {
      return response.status(500).send(error);
    }
  },
};
