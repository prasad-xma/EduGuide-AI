const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../../middleware/auth.middleware");
const { authorizedRoles } = require("../../middleware/role.middleware");

const { 
    getAllCourses, 
    enrollCourse, 
    getEnrolledCourses,
    getInstructorStudents
} = require("./enroll.controller");

router.get("/all", authenticateToken, getAllCourses);
router.post("/:courseId/enroll", authenticateToken, authorizedRoles("student"), enrollCourse);
router.get("/student", authenticateToken, authorizedRoles("student"), getEnrolledCourses);
router.get("/instructor/students", authenticateToken, authorizedRoles("instructor"), getInstructorStudents);

module.exports = router;