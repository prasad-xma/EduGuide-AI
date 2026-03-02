# Course Management Module

This module handles course creation, management, and enrollment for the EduGuide platform.

## Files Overview

### course.model.js
Defines the Course schema with fields for:
- Basic info: title, description, content
- Instructor: reference to User who created the course
- Enrollment: array of enrolled students
- Timestamps: creation and update dates

### course.service.js
Business logic for course operations:
- `createCourse()` - Creates new course with instructor validation
- `getAllCourses()` - Retrieves all available courses
- `getCourseById()` - Fetches specific course details
- `updateCourse()` - Updates course information
- `deleteCourse()` - Removes course from system
- `enrollStudent()` - Adds student to course enrollment

### course.controller.js
HTTP request handlers:
- `createCourse()` - POST /api/course
- `getAllCourses()` - GET /api/course
- `getCourseById()` - GET /api/course/:id
- `updateCourse()` - PUT /api/course/:id
- `deleteCourse()` - DELETE /api/course/:id
- `enrollStudent()` - POST /api/enroll/:courseId/enroll

### course.routes.js
Express router configuration:
- Routes connect controller functions to HTTP endpoints
- Uses `authenticateToken` middleware for protected routes
- Role-based access control for instructors vs students

## How It Works

1. **Course Creation Flow:**
   - Instructor submits course data to POST /api/course
   - Controller validates instructor role and course data
   - Service creates course with instructor reference
   - Returns course object with generated ID

2. **Course Enrollment Flow:**
   - Student requests enrollment via POST /api/enroll/:courseId/enroll
   - Controller validates student role and course existence
   - Service adds student to course enrollment array
   - Returns updated course with enrollment status

3. **Course Management Flow:**
   - Instructors can view all their created courses
   - Update course content and details
   - Delete courses they no longer need
   - View enrolled students for each course

## Security Features

- **Role-based access** - Only instructors can create/edit courses
- **Protected routes** - All endpoints require valid JWT token
- **Ownership validation** - Instructors can only modify their own courses
- **Enrollment control** - Students can only enroll in available courses
