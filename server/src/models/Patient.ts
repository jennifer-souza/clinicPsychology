import { Model } from 'objection';
import knex from '../database/connection';

Model.knex(knex);

class Patient extends Model {
    static get tableName() {
        return 'patients';
    }

    static get relationMappings() {
        const Schedule = require('./Schedule');
        const Person = require('./Person');
        const Address = require('./Address');
        const Phone = require('./Phone');

        return {
            schedules: { 
                relation: Model.BelongsToOneRelation,
                modelClass: Schedule,
                join: {
                    from: 'patients.schedule_id',
                    to: 'schedules.id'
                }
            },
            
            persons: {
                relation: Model.HasOneRelation,
                modelClass: Person,
                join: {
                    from: 'patients.id',
                    to: 'persons.patient_id'
                }
            },

            addresses: {
                relation: Model.HasOneRelation,
                modelClass: Address,
                join: {
                    from: 'patients.id',
                    to: 'addresses.patient_id'
                }
            },

            phones: {
                relation: Model.HasOneRelation,
                modelClass: Phone,
                join: {
                    from: 'patients.id',
                    to: 'phones.patient_id'
                }
            }
        }
    }
}

module.exports = Patient;