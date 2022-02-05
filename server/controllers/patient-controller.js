const Patient = require('../models/patient');
const default_get_callback = (function_name, only_first, res) => (err, patients) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 in '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!patients.length) {
    console.error(`[Hack.Diversity React Template] - 404 in '${function_name}': Patient(s) not found`);
    return res.status(404).json({
      success: false,
      error: 'Patient not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 in '${function_name}': Patient(s) fetched!`);
  let json_obj = { success: true };
  if (only_first) {
    json_obj.patient = patients[0];
  } else {
    json_obj.patients = patients;
  }
  return res.status(200).json(json_obj);
};

getPatients = async (req, res) => {
  await Patient.find({}, default_get_callback("getPatients", false, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${function_name}': ${err}`);
    console.error(err);
    return err;
  });
};

createPatient = (req, res) => {
  const body = req.body;
  console.log('----------------------- createPatient: req -----------------------')
  console.log(req);
  console.log('----------------------- createPatient: body -----------------------')
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a patient object.',
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
    createPatient
};
