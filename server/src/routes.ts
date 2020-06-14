import express from 'express';

import PatientController from './controller/PatientController';

const routes = express.Router();
const patientController = new PatientController();

routes.get('/pacientes', patientController.index);

export default routes;