const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../../middleware/auth.middleware");
const { authorizedRoles } = require("../../middleware/role.middleware");

const { 
    getAllCourses, 
    enrollCourse, 
    getEnrolledCourses 
} = require("./enroll.controller");


router.get("/all", authenticateToken, getAllCourses);
router.post("/:courseId/enroll", authenticateToken, authorizedRoles("student"), enrollCourse);
router.get("/student/:studentId", authenticateToken, authorizedRoles("student"), getEnrolledCourses);

module.exports = router;