import { Model } from 'objection';
import knex  from '../database/connection';

Model.knex(knex);

class Address extends Model {
    static get tableName() {
        return 'addresses';
    }

    static get relationMappings() {
        const Patient = require('./Patient');
        return {
            patients: {
                relation: Model.BelongsToOneRelation,
                modelClass: Patient,
                join: {
                    from: 'addresses.patient_id',
                    to: 'patients.id'
                }
            }
        }
    }
}

module.exports = Address;