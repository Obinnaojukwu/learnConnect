const Course = require('../models/courseModel');

exports.getCoursesByFaculty = async (req, res) => {
    const { facultyId } = req.params;
    try {
        const courses = await Course.find({ faculty: facultyId });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    const { name, facultyId } = req.body;
    try {
        const course = new Course({ name, faculty: facultyId });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};