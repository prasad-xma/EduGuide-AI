const Course = require("./course.model");

// create course 
const createCourse = async (data, instructor) => {
    const course = await Course.create({
        ...data,
        instructor: instructor,
    });

    return course;
}

// get all courses
const getAllCourses = async (instructorId) => {
    if (instructorId) {
        // Get only instructor's courses
        const course = await Course.find({ instructor: instructorId }).populate("instructor", "username email");
        return course;
    } else {
        // Get all courses (for students)
        const course = await Course.find().populate("instructor", "username email");
        return course;
    }
}

// get course by id 
const getCourseById = async (id) => {
    const course = await Course.findById(id).populate("instructor", "username email");
    
    if (!course) {
        throw new Error("Course not found");
    }
    return course;

}


// update course 
const updateCourse = async (id, data, instructorId) => {
    const course = await Course.findById(id);

    if (!course) {
        throw new Error("course not found");
    }

    if (course.instructor.toString() !== instructorId) {
        throw new Error("You are not authorized to update this course");
    }

    // update course 
    Object.assign(course, data);
    await course.save();

    return course;
}


// delete course 
const deleteCourse = async (id, instructorId) => {
    const course = await Course.findById(id);

    if(!course) {
        throw new Error("Course not found");
    }

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized to delte this course");
    }

    await course.deleteOne();

    return { message: "Course deleted successfully"};

}



module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,

};