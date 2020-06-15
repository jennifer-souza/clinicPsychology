import express from 'express';

import PatientController from './controller/PatientController';

const routes = express.Router();
const patientController = new PatientController();

routes.get('/pacientes', patientController.index);
routes.get('/pacientes/:id', patientController.show);
routes.post('/pacientes/novo', patientController.store);
routes.put('/pacientes/editar/:id', patientController.edit);
routes.delete('/pacientes/delete/:id', patientController.delete);


export default routes;