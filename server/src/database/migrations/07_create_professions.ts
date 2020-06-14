import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('professions', table => {
        table.increments();
        table.integer('professional_id').unsigned();
        table.foreign('professional_id')
            .references('id')
            .inTable('professionals');
        table.string('profession');
        table.string('license');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('professions');
}