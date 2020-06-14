import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('patients', table => {
        table.increments();
        table.integer('schedule_id').unsigned();
        table.foreign('schedule_id')
            .references('id')
            .inTable('schedules');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('patients');
}
