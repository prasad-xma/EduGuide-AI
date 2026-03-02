# AI Recommendation Module

This module handles AI-powered course recommendations using Google's Gemini AI for the EduGuide platform.

## Files Overview

### aiRecommendation.model.js
Defines the AI Recommendation schema with fields for:
- User: reference to User requesting recommendations
- Query: student's learning goals and interests
- AI Response: structured AI-generated recommendations
- Metadata: model used, response time, generation timestamp
- Status: recommendation active/inactive flag

### googleAi.service.js
AI service integration:
- `generateCourseRecommendations()` - Creates personalized course recommendations
- `formatRecommendations()` - Structures AI response into consistent format
- `validateQuery()` - Ensures user input is appropriate
- `getAvailableCourses()` - Fetches course database for context

### aiRecommendation.controller.js
HTTP request handlers:
- `generateRecommendations()` - POST /api/ai-recommendation/generate
- `getUserRecommendations()` - GET /api/ai-recommendation/user
- `deleteRecommendations()` - DELETE /api/ai-recommendation/:id

### aiRecommendation.routes.js
Express router configuration:
- Routes connect controller functions to HTTP endpoints
- Uses `authenticateToken` middleware for protected routes
- Rate limiting to prevent API abuse

## How It Works

1. **Recommendation Generation Flow:**
   - Student submits learning goals to POST /api/ai-recommendation/generate
   - Controller validates student role and query content
   - Service fetches available courses for AI context
   - Google AI generates personalized recommendations based on goals
   - Returns structured recommendations with career outlook and learning path

2. **AI Processing Flow:**
   - System constructs detailed prompt with course context
   - Google Gemini AI analyzes student goals and course database
   - AI generates career outlook, skills, learning path, and tips
   - Response is formatted and stored for future reference

3. **Recommendation Retrieval Flow:**
   - Students can access previous recommendations
   - Recommendations are linked to actual course enrollments
   - Historical data for tracking learning progress
   - Integration with course enrollment system

## AI Features

- **Personalized learning paths** - Custom recommendations based on individual goals
- **Career guidance** - AI provides career outlook and industry insights
- **Skill development** - Identifies key skills to acquire
- **Progressive learning** - Structured path from basics to advanced
- **Smart matching** - Aligns goals with available course content

## Technical Implementation

- **Google Gemini AI** - Uses latest Google AI model for recommendations
- **Context awareness** - AI has access to full course database
- **Structured output** - Consistent format for frontend consumption
- **Error handling** - Graceful fallback when AI service is unavailable
- **Performance optimization** - Caching and response time tracking

## Security Features

- **Student-only access** - Only students can generate recommendations
- **Input validation** - Prevents inappropriate or malicious queries
- **Rate limiting** - Controls API usage and prevents abuse
- **Data privacy** - Recommendations are stored securely with user consent
