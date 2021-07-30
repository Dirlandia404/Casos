const connection = require('../database/connection');
module.exports = {
  async index(request, response) {
    const ongs = await connection('users')
      .select('*')
      .where('type', '=', 'ONG');
    return response.json(ongs);
  },
}