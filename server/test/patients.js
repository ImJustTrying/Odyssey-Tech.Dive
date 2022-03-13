const request = require("supertest");
const server = require("../index");
const assert = require("assert");

//const id = "COVID-19-AR-12345678";
request(server)
  .post(`/api/patient`)
  .send({patientID: "COVID-19-AR-12345678"})
  .expect(201)
  .end(function(err, res) {
    if (err) {
      console.error(err);
    } else {
        request(server)
          .put(`/api/patient/${id}/sex/F`)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              console.error(err);
            } else {
                request(server)
                  .get(`/api/filtered-patients?patientID=patientID`)
                  .expect(res => { console.log(res.text); })
                  .expect(200)
                  .end(function(err, res) {
                    if (err) {
                      console.error(err);
                    } else {
                        request(server)
                          .delete(`/api/patient/${id}`)
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
