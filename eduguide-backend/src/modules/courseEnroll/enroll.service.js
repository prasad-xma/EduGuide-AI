const Course = require("../course/course.model");
const Enrollment = require("./enrollment.model");
const User = require("../auth/user.model");

// get all courses
const getAllCoursesService = async () => {
  return await Course.find().populate("instructor", "firstName lastName");
};

// enroll in course
const enrollCourseService = async (courseId, studentId) => {
    const course = await Course.findById(courseId);

    if (!course) throw new Error("Course not found");

    const existingEnrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId
    });

    if (existingEnrollment) {
        throw new Error("Already enrolled");
    }

    const enrollment = await Enrollment.create({
        student: studentId,
        course: courseId,
        instructor: course.instructor,
        progress: 0
    });

    return enrollment;
};

// get enrolled courses
const getEnrolledCoursesService = async (studentId) => {
    const enrollments = await Enrollment.find({ student: studentId })
        .populate("course", "title description")
        .populate("instructor", "firstName lastName");

    return enrollments.map(enrollment => ({
        _id: enrollment.course._id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        instructor: enrollment.instructor,
        progress: enrollment.progress,
        enrolledAt: enrollment.createdAt
    }));
};

// get instructor's enrolled students
const getInstructorStudentsService = async (instructorId) => {
    const enrollments = await Enrollment.find({ instructor: instructorId })
        .populate("course", "title")
        .populate("student", "firstName lastName email");

    return enrollments.map(enrollment => ({
        _id: enrollment._id,
        courseTitle: enrollment.course.title,
        courseId: enrollment.course._id,
        studentName: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
        studentEmail: enrollment.student.email,
        studentId: enrollment.student._id,
        progress: enrollment.progress,
        enrolledAt: enrollment.createdAt
    }));
};

module.exports = {
    getAllCoursesService,
    enrollCourseService,
    getEnrolledCoursesService,
    getInstructorStudentsService,
};