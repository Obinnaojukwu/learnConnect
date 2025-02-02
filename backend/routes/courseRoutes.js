const express = require('express');
const { getCoursesByFaculty, createCourse } = require('../controllers/courseController');
const router = express.Router();

router.get('/:facultyId', getCoursesByFaculty);
router.post('/', createCourse);

module.exports = router;