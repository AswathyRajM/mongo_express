const express = require('express');
const router = express.Router();

const student_controller = require('../controllers/student.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', student_controller.test);

// creates a student 
router.post('/create', student_controller.student_create);

// lists the details of students who have passed the exam
router.get('/list', student_controller.marks_list);

//put the average age of students with min_mark, max_mark and subject
router.post('/average',student_controller._average)
module.exports = router;