const csv = require('csv-parse');
const fs = require('fs');
const mongoose = require('mongoose');
const Exam = require('../models/exam-model');

mongoose
  .connect('mongodb://127.0.0.1:27017/items', { useNewUrlParser: true, useFindAndModify: false })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

try {
  const file_contents = fs.readFileSync("data/images.csv", "utf8").trim();
  csv.parse(
    file_contents,
    {
      columns: [
        "patientID",
        "diagnosisToImageStudy",
        "diagnosisToImagingTime",
        "imageStudyDescription",
        "studyModality",
        "FIO2AtTimeOfImageStudy",
        "keyFindings",
        "imageFilename",
        "examID"
      ]
    },

    (err, records) => {
      if (err) { console.error(err); }
      else {
        for (let i = 1; i < records.length; i += 1) {
          const record = records[i];
          for (const property in record) {
            const numeric_properties = ["diagnosisToImageStudy", "diagnosisToImagingTime", "FIO2AtTimeOfImageStudy"];

            if (record[property] === "NULL" || record[property] === "") {
              record[property] = null;
            } else if (numeric_properties.includes(property)) {
              record[property] = parseInt(record[property]);
            }
          }
          const exam = new Exam(record);
          exam.save().catch(err => { console.error(err); });
        }
      }
    }
  );
} catch (err) {
  console.error(err);
}
