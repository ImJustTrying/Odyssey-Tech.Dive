const express = require('express');

const ExamController = require('../controllers/exam-controller');

const router = express.Router();

router.get('/exams', ExamController.getExams);
router.get('/filtered-exams', ExamController.getFilteredExams);
router.put('/exam/:id/:field/:value', ExamController.updateExam);
router.post('/exam', ExamController.createExam);
router.delete('/exam/:id', ExamController.deleteExam);

module.exports = router;
