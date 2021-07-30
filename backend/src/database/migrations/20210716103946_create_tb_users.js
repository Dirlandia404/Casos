const {onUpdateTrigger} = require("../../../knexfile")
exports.up = async (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('login').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').unique().notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('type').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).then(() => knex.raw(onUpdateTrigger('users')));

exports.down = async (knex) => knex.schema.dropTable('users');
