import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('persons', table => {
        table.increments();
        table.integer('patient_id').unsigned();
        table.foreign('patient_id')
            .references('id')
            .inTable('patients');
        table.integer('professional_id').unsigned();
        table.foreign('professional_id')
            .references('id')
            .inTable('professionals');
        table.string('name');
        table.string('cpf');
        table.string('rg');
        table.date('birth');
        table.string('email');
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('persons');
}