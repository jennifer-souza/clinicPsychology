import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.integer('professional_id').unsigned();
        table.foreign('professional_id')
            .references('id')
            .inTable('professionals');
        table.string('email').unique();
        table.string('password');
        table.integer('level');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('users');
}