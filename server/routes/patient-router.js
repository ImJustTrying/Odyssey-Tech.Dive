const express = require('express');

const PatientController = require('../controllers/patient-controller');

const router = express.Router();

router.get('/patients', PatientController.getPatients);
router.get('/filtered-patients', PatientController.getFilteredPatients);
router.put('/patient/:id/:field/:value', PatientController.updatePatient);
router.post('/patient', PatientController.createPatient);
router.delete('/patient/:id', PatientController.deletePatient);

module.exports = router;
