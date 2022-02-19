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
  if (req.query.id) {
    query_obj.patientID = new RegExp(req.query.id, 'i');
  }

  await Exam.find(query_obj, default_get_callback("getFilteredExams", false, res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};

updateExam = async (req, res) => {
  let query_obj = { patientID: req.params.id };
  await Exam.updateOne(query_obj, { $set: {}})
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};

deleteExam = async (req, res) => {
  await Exam.findOneAndDelete(
    { patientID: new RegExp(req.params.id, 'i') },
    default_delete_callback("deleteExam", res))
  .catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in '${arguments.callee.name}': ${err}`);
    console.error(err);
    return err;
  });
};

module.exports = {
  getExams,
  getFilteredExams,
  updateExam,
  deleteExam
};
