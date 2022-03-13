/* eslint-disable no-undef, arrow-body-style */
const Exam = require('../models/exam-model');

const default_get_callback = (function_name, only_first, res) => (err, exams) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 from '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!exams.length) {
    console.error(`[Hack.Diversity React Template] - 404 from '${function_name}': exam not found`);
    return res.status(404).json({
      success: false,
      error: 'exam not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 from '${function_name}': exam fetched!`);
  let json_obj = { success: true };
  if (only_first) {
    json_obj.exam = exams[0];
  } else {
    json_obj.exams = exams;
  }
  return res.status(200).json(json_obj);
};


const default_delete_callback = (function_name, res) => (err, exam) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 from '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!exam) {
    console.error(`[Hack.Diversity React Template] - 404 from '${function_name}': exam not found, got ${exam}`);
    return res.status(404).json({
      success: false,
      error: 'exam not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 from '${function_name}': exam deleted!`);
  let json_obj = { success: true, exam: exam };
  return res.status(200).json(json_obj);
};


const update_callback = (function_name, res) => (err, exam) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 from '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!exam) {
    console.error(`[Hack.Diversity React Template] - 404 from '${function_name}': exam not found, got ${exam}`);
    return res.status(404).json({
      success: false,
      error: 'exam not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 from '${function_name}': exam updated!`);
  let json_obj = { success: true, exam: exam };
  return res.status(200).json(json_obj);
};



getExams = async (req, res) => {
  await Exam.find({}, default_get_callback("getExams", false, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};

getFilteredExams = async (req, res) => {
  let query_obj = {};
  if (req.query.patientID) {
    query_obj.patientID = req.query.patientID;
  }

  if (req.query.diagnosisToImageStudy) {
    query_obj.diagnosisToImageStudy = req.query.diagnosisToImageStudy;
  }

  if (req.query.imageStudyDescription) {
    query_obj.imageStudyDescription = req.query.imageStudyDescription;
  }

  if (req.query.studyModality) {
    query_obj.studyModality = req.query.studyModality;
  }

  if (req.query.FIO2AtTimeOfImageStudy) {
    query_obj.FIO2AtTimeOfImageStudy = req.query.FIO2AtTimeOfImageStudy;
  }

  if (req.query.keyFindings) {
    query_obj.keyFindings = req.query.keyFindings;
  }

  if (req.query.imageFilename){
    query_obj.imageFilename = req.query.imageFilename;
  }

  if (req.query.examID){
    query_obj.examID = req.query.examID;
  }

  await Exam.find(query_obj, default_get_callback("getFilteredExams", false, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};


updateExam = async (req, res) => {
  let query_obj = { _id: req.params.id };
  let assignment_obj = {};
  assignment_obj[req.params.field] = req.params.value;
  await Exam.findOneAndUpdate(query_obj, assignment_obj, {returnDocument: "after"}, update_callback("updateExam", res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    })
  });
};


deleteExam = async (req, res) => {
  await Exam.findOneAndDelete(
    { _id: req.params.id },
    default_delete_callback("deleteExam", res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};


createExam = (req, res) => {
  const body = req.body;
  console.log('----------------------- createExam: body -----------------------')
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an exam.',
    });
  }

  const exam = new Exam(body);

  if (!exam) {
    console.error(`[Hack.Diversity React Template] - 400 in 'createExam': 'exam' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'exam' is malformed",
    });
  }

  console.log('----------------------- createExam: exam -----------------------')
  console.log(exam);

  return exam
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createExam': Exam created!`);
      return res.status(201).json({
        success: true,
        id: exam._id,
        message: 'Exam created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createExam'`);
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
  getExams,
  getFilteredExams,
  updateExam,
  deleteExam,
  createExam
};
