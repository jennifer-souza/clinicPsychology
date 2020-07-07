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

    async store(request: Request, response: Response) {
    }
    
    async show(request: Request, response: Response) {
        const { id } = request.params;
    
        const patient = await knex('patients').where('id', id).first();
    
        if (!patient) {
            return response.status(400).json({
                message: 'Paciente não encontrado.'
            });
        }
    
        const person = await knex('patients')
            .join('persons', 'patients.id', '=', 'persons.patient_id')
            .join('addresses', 'patients.id', '=', 'addresses.patient_id')
            .join('phones', 'patients.id', '=', 'phones.patient_id')
            .where('patients.id', id)
            .select('persons.*', 'addresses.*', 'phones.*');
    
        return response.json({ person });
    }

    async edit(request: Request, response: Response) {

    }

    async delete(request: Request, response: Response) {

    }
}

export default PatientController;