const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema({
    patientID: String,
    age: Number,
    sex: String, // Either M or F
    race: String,
    zip: Number,
    latestBMI: Number,
    latestWeight: Number,
    latestHeight: String,
    // Medical history
    tuberculosis: Boolean,
    systemicLupusErythmatosus: Boolean,
    rheumatoidArthritis: Boolean,
    extensiveBurns: Boolean,
    asplenia: Boolean,
    hyposplenia: Boolean,
    measles: Boolean,
    cytomegalovirus: Boolean,
    chickenPox: Boolean,
    herpesZoster: Boolean,
    malnutrition: Boolean,
    currentPregnant: Boolean,
    chronicKidneyDisease: Boolean,
    diabetesType1: Boolean,
    diabetesType2: Boolean,
    transplant: Boolean,
    hemodialysisPreDiagnosis: Boolean,
    hemodialysisPostDiagnosis: Boolean,
    cancer: Boolean,
    // Covid related history
    covidTestPositive: Boolean,
    testName: String,
    ICUAdmit: Boolean,
    ICUAdmits: Number,
    mortality: Boolean
}); 

module.exports = mongoose.model('patient', Patient);
