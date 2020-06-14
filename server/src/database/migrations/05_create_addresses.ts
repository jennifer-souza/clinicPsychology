import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('addresses', table => {
        table.increments();
        table.integer('patient_id').unsigned();
        table.foreign('patient_id')
            .references('id')
            .inTable('patients');
        table.integer('professional_id').unsigned();
        table.foreign('professional_id')
            .references('id')
            .inTable('professionals');
        table.string('zip');
        table.string('street');
        table.string('number');
        table.string('complement');
        table.string('neighborhood');
        table.string('city');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('addresses');
}