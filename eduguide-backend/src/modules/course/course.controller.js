const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,

} = require("./course.service");


// create course
const create = async (req, res) => {
    try {
       const course = await createCourse(req.body, req.user.id);
       res.status(201).json({data: course});
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// get all courses
const getAll = async (req, res) => {
    try {
        // If user is instructor, get only their courses
        // If user is student, get all courses
        const courses = await getAllCourses(req.user.role === 'instructor' ? req.user.id : null);
        res.status(200).json({ data: courses});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// get single course
const getById = async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);
        res.status(200).json({ data: course });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// update course
const update = async (req, res) => {
    try {
        const course = await updateCourse(req.params.id, req.body, req.user.id);
        res.status(200).json({ data: course });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete course
const deletecourse = async (req, res) => {
    try {
        const result = await deleteCourse(req.params.id, req.user.id);
        res.status(200).json({ message: result.message });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    create,
    getAll,
    getById,
    update,
    deletecourse,
};