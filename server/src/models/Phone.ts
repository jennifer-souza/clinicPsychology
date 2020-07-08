import { Model } from 'objection';
import knex  from '../database/connection';

Model.knex(knex);

class Phone extends Model {
    static get tableName() {
        return 'phones';
    }

    static get relationMappings() {
        const Patient = require('./Patient');
        return {
            patients: {
                relation: Model.BelongsToOneRelation,
                modelClass: Patient,
                join: {
                    from: 'phones.patient_id',
                    to: 'patients.id'
                }
            }
        }
    }
}

module.exports = Phone;