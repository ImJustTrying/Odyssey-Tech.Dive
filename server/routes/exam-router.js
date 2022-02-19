const express = require('express');

const ExamController = require('../controllers/exam-controller');

const router = express.Router();

router.get('/exams', ExamController.getExams);
router.get('/filtered-exams', ExamController.getFilteredExams);
router.post('/exam/:id/:field/:value', ExamController.updateExam);
router.delete('/exam/:id', ExamController.deleteExam);

module.exports = router;
