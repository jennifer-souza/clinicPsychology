import { Model } from 'objection';
import knex from '../database/connection';

Model.knex(knex);

class Schedule extends Model {
    static get tableName() {
        return 'schedules';
    }
    
    static get relationMappings() {
        const Patient = require('./Patient');
        return {
            patients: {
                relation: Model.HasOneRelation,
                modelClass: Patient,
                join: {
                    from: 'schedules.id',
                    to: 'patients.schedule_id'
                } 
            }
        }
    }
}

module.exports = Schedule;