const request = require("supertest");
const server = require("../index");
const assert = require("assert");

request(server)
  .delete("/api/exam/16434381")
  .expect(200)
  .end(function(err, res) {
    if (err) {
      console.error(err);
    }
  });

request(server)
  .get("/api/filtered-exams?id=16434381")
  .expect(404)
  .end(function(err, res) {
    if (err) {
      console.error(err);
    }
    server.close();
  });


