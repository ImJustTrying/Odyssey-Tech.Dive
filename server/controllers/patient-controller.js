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
  if (req.query.patientID) {
  
    query_obj.patientID = req.query.patientID;
  }
  if (req.query.age) {

    query_obj.age = req.query.age;
  } 
  
  if (req.query.sex) {

    query_obj.sex = req.query.sex;
  }
  
  if (req.query.race) {

    query_obj.race = req.query.race;
  }
  
  if (req.query.zip) {

    query_obj.zip = req.query.zip;
  }
  
  if (req.query.lastestBMI) {

    query_obj.lastestBMI = req.query.lastestBMI;
  }
  
  if (req.query.latestWeight) {

    query_obj.latestWeight = req.query.latestWeight;
  } 
  
  if (req.query.latestHeight) {

    query_obj.latestHeight = req.query.latestHeight;
  } 
  
  if (req.query.tuberculosis) {

    query_obj.tuberculosis = req.query.tuberculosis;
  } 
  
  if (req.query.systemicLupusErythmatosus) {

    query_obj.systemicLupusErythmatosus = req.query.systemicLupusErythmatosus;
  }  
  
  if (req.query.rheumatoidArthritis) {

    query_obj.rheumatoidArthritis = req.query.rheumatoidArthritis;
  }  
  
  if (req.query.extensiveBurns) {

    query_obj.extensiveBurns = req.query.extensiveBurns;
  } 
  
  if (req.query.asplenia) {

    query_obj.asplenia = req.query.asplenia;
  }
  
  if (req.query.hyposplenia) {

    query_obj.hyposplenia = req.query.hyposplenia;
  } 
  
  if (req.query.measles) {

    query_obj.measles = req.query.measles;
  } 
  
  if (req.query.cytomegalovirus) {

    query_obj.cytomegalovirus = req.query.cytomegalovirus;
  }
  
  if (req.query.chickenPox) {

    query_obj.chickenPox = req.query.chickenPox;
  } 
  
  if (req.query.herpesZoster) {

    query_obj.herpesZoster = req.query.herpesZoster;
  } 
  
  if (req.query.malnutrition) {

    query_obj.malnutrition = req.query.malnutrition;
  } 
  
  if (req.query.currentPregnant) {

    query_obj.currentPregnant = req.query.currentPregnant;
  } 
  
  if (req.query.chronicKidneyDisease) {

    query_obj.chronicKidneyDisease =req.query.chronicKidneyDisease;
  }
  
  if (req.query.diabetesType1) {

    query_obj.diabetesType1 = req.query.diabetesType1;
  } 
  
  if (req.query.diabetesType2) {

    query_obj.diabetesType2 = req.query.diabetesType2;
  }
  
  if (req.query.transplant) {

    query_obj.transplant = req.query.transplant;
  } 
  
  if (req.query.hemodialysisPreDiagnosis) {

    query_obj.hemodialysisPreDiagnosis = req.query.hemodialysisPreDiagnosis;
  } 
  
  if (req.query.hemodialysisPostDiagnosis) {

    query_obj.hemodialysisPostDiagnosis = req.query.hemodialysisPostDiagnosis;
  } 
  
  if (req.query.cancer) {

    query_obj.cancer = req.query.cancer;
  } 
  
  if (req.query.covidTestPositive) {

    query_obj.covidTestPositive = req.query.covidTestPositive;
  } 
  
  if (req.query.testName) {

    query_obj.testName = req.query.testName;
  } 
  
  if (req.query.ICUadmit) {

    query_obj.ICUadmit =req.query.ICUadmit;
  } 
  
  if (req.query.icuAdmits) {

    query_obj.ICUAdmits = req.query.ICUadmit;
  } 
  
  if (req.query.mortality) {

    query_obj.mortality = req.query.mortality;
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
      console.log(err);
      console.error(`[Hack.Diversity React Template] - caught error in 'createPatient'`);
      
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