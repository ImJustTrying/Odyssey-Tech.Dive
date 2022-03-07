const request = require("supertest");
const server = require("../index");
const assert = require("assert");

request(server)
  .post(`/api/exam`)
  .send({patientID: "COVID-19-AR-12345678", diagnosisToImageStudy: 0})
  .expect(201)
  .end(function(err, res) {
    if (err) {
      console.error(err);
    } else {
        const id = res.body.id;
        request(server)
          .put(`/api/exam/${id}/diagnosisToImageStudy/10`)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              console.error(err);
            } else {
                request(server)
                  .get(`/api/filtered-exams?id=${id}`)
                  .expect(res => { console.log(res.text); })
                  .expect(200)
                  .end(function(err, res) {
                    if (err) {
                      console.error(err);
                    } else {
                        request(server)
                          .delete(`/api/exam/${id}`)
                          .expect(200)
                          .end(function(err, res) {
                            if (err) {
                              console.error(err);
                            }
                          }
                        );
                    }
                  }
                );
            }
          });
    }
});
