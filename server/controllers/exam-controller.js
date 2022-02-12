/* eslint-disable no-undef, arrow-body-style */
const Exam = require('../models/exam-model');
const default_get_callback = (function_name, only_first, res) => (err, exams) => {
  if (err) {
    console.error(`[Hack.Diversity React Template] - 400 in '${function_name}': ${err}`);
    throw res.status(400).json({
      success: false,
      error: err,
    });
  }
  if (!exams.length) {
    console.error(`[Hack.Diversity React Template] - 404 in '${function_name}': exam not found`);
    return res.status(404).json({
      success: false,
      error: 'exam not found',
    });
  }
  console.log(`[Hack.Diversity React Template] - 200 in '${function_name}': exam fetched!`);
  let json_obj = { success: true };
  if (only_first) {
    json_obj.exam = exams[0];
  } else {
    json_obj.exams = exams;
  }
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

module.exports = {
  getExams
};
