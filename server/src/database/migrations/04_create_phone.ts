import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('phones', table => {
        table.increments();
        table.integer('patient_id').unsigned();
        table.foreign('patient_id')
            .references('id')
            .inTable('patients');
        table.integer('professional_id').unsigned();
        table.foreign('professional_id')
            .references('id')
            .inTable('professionals');
        table.string('ddd', 3);
        table.string('phone', 13);
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('phones');
}