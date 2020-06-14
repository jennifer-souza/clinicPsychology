import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('scales', table => {
        table.increments();
        table.integer('professional_id').unsigned();
        table.foreign('professional_id')
            .references('id')
            .inTable('professionals');
        table.date('date');
        table.time('time');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('scales');
}