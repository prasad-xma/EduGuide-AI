# Course Enrollment Module

This module handles student course enrollment and enrollment management for the EduGuide platform.

## Files Overview

### enroll.model.js
Defines the Enrollment schema with fields for:
- Student: reference to User who is enrolling
- Course: reference to Course being enrolled in
- Status: enrollment status (pending, active, completed)
- Progress: student's progress in the course
- Timestamps: enrollment date and completion tracking

### enroll.service.js
Business logic for enrollment operations:
- `enrollStudent()` - Adds student to course enrollment
- `getEnrollments()` - Retrieves student's enrollments
- `updateProgress()` - Updates student's course progress
- `unenrollStudent()` - Removes student from course
- `getCourseEnrollments()` - Gets all enrollments for a course

### enroll.controller.js
HTTP request handlers:
- `enrollInCourse()` - POST /api/enroll/:courseId/enroll
- `getStudentEnrollments()` - GET /api/enroll/student
- `updateProgress()` - PUT /api/enroll/:enrollmentId/progress
- `unenrollFromCourse()` - DELETE /api/enroll/:courseId/unenroll
- `getCourseEnrollments()` - GET /api/enroll/course/:courseId

### enroll.routes.js
Express router configuration:
- Routes connect controller functions to HTTP endpoints
- Uses `authenticateToken` middleware for protected routes
- Student role validation for enrollment operations

## How It Works

1. **Student Enrollment Flow:**
   - Student requests enrollment via POST /api/enroll/:courseId/enroll
   - Controller validates student role and course availability
   - Service creates enrollment record with pending status
   - Returns enrollment confirmation with course details

2. **Progress Tracking Flow:**
   - Students update progress via PUT /api/enroll/:enrollmentId/progress
   - Controller validates enrollment ownership
   - Service updates progress percentage and completion status
   - Returns updated enrollment with progress data

3. **Enrollment Management Flow:**
   - Students can view all their active enrollments
   - Instructors can view enrollments for their courses
   - Students can unenroll from courses if needed
   - Progress tracking throughout the learning journey

## Features

- **Real-time progress** - Live updates to course completion
- **Enrollment limits** - Prevents duplicate enrollments
- **Progress validation** - Ensures progress values are valid (0-100%)
- **Status management** - Tracks enrollment lifecycle from start to completion
- **Student analytics** - Provides data for learning insights

## Security Features

- **Student-only access** - Only students can enroll in courses
- **Ownership validation** - Students can only manage their own enrollments
- **Protected routes** - All endpoints require valid JWT token
- **Course validation** - Ensures course exists before enrollment
