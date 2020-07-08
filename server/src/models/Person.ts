import { Model } from 'objection';
import knex  from '../database/connection';

Model.knex(knex);

class Person extends Model {
    static get tableName() {
        return 'persons';
    }

    static get relationMappings() {
        const Patient = require('./Patient');
        return {
            patients: {
                relation: Model.BelongsToOneRelation,
                modelClass: Patient,
                join: {
                    from: 'persons.patient_id',
                    to: 'patients.id'
                }
            }
        }
    }
}

module.exports = Person;