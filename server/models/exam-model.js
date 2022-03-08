const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema({
    patientID: String, // Not a globally unique ID
    diagnosisToImageStudy: Number, // In days
    diagnosisToImagingTime: Number, // In hours
    imageStudyDescription: String,
    studyModality: String,
    FIO2AtTimeOfImageStudy: Number,
    keyFindings: String,
    imageFilename: String,
    examID: String // Not a globally unique ID
});

module.exports = mongoose.model('exam', Exam);
