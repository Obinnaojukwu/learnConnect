const express = require('express');
const { getFaculties, createFaculty, populateFacultiesAndCourses } = require('../controllers/facultyController');
const router = express.Router();

router.get('/', getFaculties);
router.post('/', createFaculty);
router.post('/populate', populateFacultiesAndCourses);

module.exports = router;