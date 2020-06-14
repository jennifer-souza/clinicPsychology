import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('schedules', table => {
        table.increments();
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('schedules');
}