const csv = require('csv-parse');
const fs = require('fs');
const mongoose = require('mongoose');
const Patient = require('../models/patient-model');

mongoose
  .connect('mongodb://127.0.0.1:27017/items', { useNewUrlParser: true, useFindAndModify: false })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

try {
  const file_contents = fs.readFileSync("data/data.csv", "utf8").trim();
  csv.parse(
    file_contents,
    {
      columns: [
        "patientID",
        "age",
        "sex",
        "race",
        "zip",
        "latestBMI",
        "latestWeight",
        "latestHeight",
        // Medical history
        "tuberculosis",
        "systemicLupusErythmatosus",
        "rheumatoidArthritis",
        "extensiveBurns",
        "asplenia",
        "hyposplenia",
        "measles",
        "cytomegalovirus",
        "chickenPox",
        "herpesZoster",
        "malnutrition",
        "currentPregnant",
        "chronicKidneyDisease",
        "diabetesType1",
        "diabetesType2",
        "transplant",
        "hemodialysisPreDiagnosis",
        "hemodialysisPostDiagnosis",
        "cancer",
        // Covid related history
        "covidTestPositive",
        "testName",
        "ICUAdmit",
        "ICUAdmits",
        "mortality"
      ]
    },

    (err, records) => {
      if (err) { console.error(err); }
      else {
        for (let i = 1; i < records.length; i += 1) {
          const record = records[i];
          for (const property in record) {
            const numeric_properties = ["age", "zip", "latestBMI", "latestWeight", "ICUAdmits"];

            if (record[property] === "NULL") {
              record[property] = null;
            } else if (record[property] === "N") {
              record[property] = false;
            } else if (record[property] === "Y") {
              record[property] = true;
            } else if (numeric_properties.includes(property)) {
              record[property] = parseInt(record[property]);
            }
          }
          const patient = new Patient(record);
          patient.save().catch(err => { console.error(err); });
        }
      }
    }
  );
} catch (err) {
  console.error(err);
}
