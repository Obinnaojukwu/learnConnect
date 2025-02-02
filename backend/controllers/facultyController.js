const Faculty = require('../models/facultyModel');
const Course = require('../models/courseModel');

const facultiesAndCourses = [
    {
        name: "Faculty of Agriculture",
        courses: [
            "Agricultural Economics", "Agricultural Extension", "Animal Science", "Crop Science",
            "Food Science", "Forestry", "Soil Science"
        ]
    },
    {
        name: "Faculty of Arts",
        courses: [
            "English Language & Literature", "Fine & Applied Arts", "French", "History",
            "Linguistics", "Philosophy", "Religious Studies", "Theatre Arts"
        ]
    },
    {
        name: "Faculty of Education",
        courses: [
            "Adult Education", "Education", "Educational Management", "Guidance & Counseling",
            "Library Science", "Physical Education", "Primary Education", "Special Education"
        ]
    },
    {
        name: "Faculty of Engineering",
        courses: [
            "Agricultural Engineering", "Chemical Engineering", "Civil Engineering", "Computer Engineering",
            "Electrical/Electronic Engineering", "Mechanical Engineering", "Petroleum Engineering"
        ]
    },
    {
        name: "Faculty of Law",
        courses: ["Law"]
    },
    {
        name: "Faculty of Life Sciences",
        courses: ["Biochemistry", "Botany", "Microbiology", "Zoology"]
    },
    {
        name: "Faculty of Management Sciences",
        courses: [
            "Accounting", "Banking & Finance", "Business Administration", "Marketing",
            "Public Administration"
        ]
    },
    {
        name: "Faculty of Pharmacy",
        courses: ["Pharmacy", "Pharmacology"]
    },
    {
        name: "Faculty of Physical Sciences",
        courses: ["Chemistry", "Computer Science", "Geology", "Mathematics", "Physics"]
    },
    {
        name: "Faculty of Social Sciences",
        courses: ["Economics", "Geography", "Mass Communication", "Sociology", "Statistics"]
    },
    {
        name: "College of Medical Sciences",
        courses: ["Anatomy", "Biochemistry", "Medicine", "Nursing", "Optometry", "Physiology", "Pharmacy"]
    },
    {
        name: "Faculty of Environmental Sciences",
        courses: ["Architecture", "Building", "Estate Management", "Environmental Science", "Quantity Surveying", "Urban and Regional Planning"]
    }
];

exports.getFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find().populate('courses');
        res.json(faculties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createFaculty = async (req, res) => {
    const { name, courses } = req.body;
    try {
        const faculty = new Faculty({ name, courses });
        await faculty.save();
        res.status(201).json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.populateFacultiesAndCourses = async (req, res) => {
    try {
        for (const facultyData of facultiesAndCourses) {
            const courses = await Promise.all(facultyData.courses.map(async (name) => {
                const course = new Course({ name, faculty: null });
                await course.save();
                return course;
            }));

            const faculty = new Faculty({ name: facultyData.name, courses: courses.map(course => course._id) });
            await faculty.save();

            // Update course references to the faculty
            await Promise.all(courses.map(async (course) => {
                course.faculty = faculty._id;
                await course.save();
            }));
        }
        res.status(201).json({ message: 'Faculties and courses populated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};