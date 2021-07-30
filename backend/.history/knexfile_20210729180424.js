// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'helpmore_test',
      user: 'postgres',
      password: 'qwe123',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
    },
    useNullAsDefault: true,
  },
  onUpdateTrigger: table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW 
    EXECUTE PROCEDURE on_update_timestamp();
    `
};
  
  /*staging: {
    client: 'postgresql',
    connection: {
      database: 'helpmore',
      user: 'postgres',
      password: '28031970',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'helpmore',
      user: 'postgres',
      password: '28031970',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
    },
    useNullAsDefault: true,
  },*/
//};
