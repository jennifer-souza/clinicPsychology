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
        const {
            id,
            schedule_id, 
            timestamps,
            name,
            cpf,
            rg,
            birth,
            email,
            zip,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            ddd,
            phone
        } = request.body;

        const trx = await knex.transaction();
        
        const id_fk = await trx('patients').insert({id, schedule_id, timestamps});
        await trx.commit(id_fk);
        
        const trxn = await knex.transaction();
        const patient_id = id_fk[0];
        
        const person = await trx('persons').insert({
            patient_id: 'patient_id',
            name,
            cpf,
            rg,
            birth,
            email,
            timestamps
        });

        const address = await trx('addresses').insert({
            patient_id: 'patient_id',
            zip,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            timestamps
        });
        
        const cellphone = await trx('phones').insert({
            patient_id: 'patient_id',
            ddd,
            phone,
            timestamps
        });

        await trxn.commit(person);
        await trxn.commit(address);
        await trxn.commit(cellphone);

        return response.json({
            id: patient_id,
            ... person,
            ... address,
            ... cellphone
        });
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