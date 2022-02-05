const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema({
    patientID: String,
    diagnosisToImageStudy: Number, // In days
    diagnosisToImagingTime: Number, // In hours
    imageStudyDescription: String,
    studyModality: String,
    FIO2AtTimeOfImageStudy: Number,
    keyFindings: String
});

module.exports = mongoose.model('exam', Exam);
