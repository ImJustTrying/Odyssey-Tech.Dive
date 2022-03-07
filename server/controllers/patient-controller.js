/* eslint-disable no-undef, arrow-body-style */
const Patient = require('../models/patient-model');

const default_get_callback = (function_name, only_first, res) => (err, patients) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 from '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!patients.length) {
    console.error(`[Hack.Diversity React Template] - 404 from '${function_name}': patient not found`);
    return res.status(404).json({
      success: false,
      error: 'patient not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 from '${function_name}': patient fetched!`);
  let json_obj = { success: true };
  if (only_first) {
    json_obj.patient = patients[0];
  } else {
    json_obj.patients = patients;
  }
  return res.status(200).json(json_obj);
};


const default_delete_callback = (function_name, res) => (err, patient) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 from '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!patient) {
    console.error(`[Hack.Diversity React Template] - 404 from '${function_name}': patient not found, got ${patient}`);
    return res.status(404).json({
      success: false,
      error: 'patient not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 from '${function_name}': patient deleted!`);
  let json_obj = { success: true, patient: patient };
  return res.status(200).json(json_obj);
};


const update_callback = (function_name, res) => (err, patient) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 from '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!patient) {
    console.error(`[Hack.Diversity React Template] - 404 from '${function_name}': patient not found, got ${patient}`);
    return res.status(404).json({
      success: false,
      error: 'patient not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 from '${function_name}': patient updated!`);
  let json_obj = { success: true, patient: patient };
  return res.status(200).json(json_obj);
};



getPatients = async (req, res) => {
  await Patient.find({}, default_get_callback("getPatients", false, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};

getFilteredPatients = async (req, res) => {
  let query_obj = {};
  if (req.query.id) {
    query_obj.patientID = req.query.id;
  }

  await Patient.find(query_obj, default_get_callback("getFilteredPatients", false, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};


updatePatient = async (req, res) => {
  let query_obj = { patientID: req.params.id };
  let assignment_obj = {};
  assignment_obj[req.params.field] = req.params.value;
  await Patient.findOneAndUpdate(query_obj, assignment_obj, {returnDocument: "after"}, update_callback("updatePatient", res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    })
  });
};


deletePatient = async (req, res) => {
  await Patient.findOneAndDelete(
    { patientID: req.params.id },
    default_delete_callback("deletePatient", res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};


createPatient = (req, res) => {
  const body = req.body;
  console.log('----------------------- createPatient: body -----------------------')
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an patient.',
    });
  }

  const patient = new Patient(body);

  if (!patient) {
    console.error(`[Hack.Diversity React Template] - 400 in 'createPatient': 'patient' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'patient' is malformed",
    });
  }

  console.log('----------------------- createPatient: patient -----------------------')
  console.log(patient);

  return patient
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createPatient': Patient created!`);
      return res.status(201).json({
        success: true,
        id: patient.patientID,
        message: 'Patient created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createPatient'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
        console.error(
          `[Hack.Diversity React Template] => ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};



module.exports = {
  getPatients,
  getFilteredPatients,
  updatePatient,
  deletePatient,
  createPatient
};
