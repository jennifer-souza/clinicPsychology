import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('patient_person', table => {
        table.increments();
        table.integer('patient_id').unsigned();
        table.foreign('patient_id')
            .references('id')
            .inTable('patients');
        table.integer('person_id').unsigned();
        table.foreign('person_id')
            .references('id')
            .inTable('persons');
    });
} 

export async function down(knex: Knex) {
    knex.schema.dropTableIfExists('patient_person');
}