import { Request, Response } from 'express';
import knex from '../database/connection';

class PatientController {

    async index(request: Request, response: Response) {
        const pacientes = await knex('patients')
            .join('persons', 'patients.id', '=', 'persons.patient_id')
            .join('addresses', 'patients.id', '=', 'addresses.patient_id')
            .join('phones', 'patients.id', '=', 'phones.patient_id')
            .select('patients.*', 'persons.*', 'addresses.*', 'phones.*');            

        response.json(pacientes);
    }
}

export default PatientController;