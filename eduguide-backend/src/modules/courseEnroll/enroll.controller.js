const { getAllCoursesService, enrollCourseService, getEnrolledCoursesService } = require("./enroll.service");

// get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await getAllCoursesService();
        
        res.status(200).json({
            success: true,
            message: "Courses retrieved successfully",
            data: courses
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// enroll in course
const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id; // Get from authenticated user
        
        const course = await enrollCourseService(courseId, studentId);
        
        res.status(200).json({ 
            success: true, 
            message: "Enrolled in course successfully", 
            data: course 
        });
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// get enrolled courses
const getEnrolledCourses = async (req, res) => {
    try {
        const studentId = req.user.id; // Get from authenticated user
        
        const courses = await getEnrolledCoursesService(studentId);
        
        res.status(200).json({
            success: true,
            message: "Enrolled courses retrieved successfully",
            data: courses
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllCourses,
    enrollCourse,
    getEnrolledCourses,
};
