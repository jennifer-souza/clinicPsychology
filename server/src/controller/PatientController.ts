import { Request, Response } from 'express';
import knex from '../database/connection';

class PatientController {

    async index(request: Request, response: Response) {
        const patients = await knex('patients')
            .join('persons', 'patients.id', '=', 'persons.patient_id')
            .join('addresses', 'patients.id', '=', 'addresses.patient_id')
            .join('phone', 'patients.id', '=', 'phone.patient_id')
            .select('patients.*');

        response.json(patients);
    }
}

export default PatientController;