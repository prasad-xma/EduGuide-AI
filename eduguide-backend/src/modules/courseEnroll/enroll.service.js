const Course = require("../course/course.model");

// get all courses
const getAllCoursesService = async () => {
  return await Course.find().populate("instructor", "firstName lastName");
};


// enroll in course
const enrollCourseService = async (courseId, studentId) => {
    const course = await Course.findById(courseId);

    if (!course) throw new Error("Course not found");

    if (course.enrolledStudents.includes(studentId)) {
        throw new Error("Already enrolled");
    }


    course.enrolledStudents.push(studentId);
    await course.save();

    return course;
};


// get enrolled courses
const getEnrolledCoursesService = async (studentId) => {
    return await Course.find({
        enrolledStudents: studentId,
    }).populate("instructor", "firstName lastName");
};



module.exports = {
    getAllCoursesService,
    enrollCourseService,
    getEnrolledCoursesService,

};