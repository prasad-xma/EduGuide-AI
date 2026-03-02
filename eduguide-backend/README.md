# EduGuide Backend

Educational platform backend API with AI-powered course recommendations and comprehensive course management.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework for API endpoints
- **MongoDB** - Database for data persistence
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Google Generative AI** - AI course recommendations
- **CORS** - Cross-origin resource sharing

## Key Features

### Authentication System
- User registration and login with JWT tokens
- Role-based access control (student/instructor)
- Secure password hashing with bcrypt
- Profile management and user data

### Course Management
- Instructors can create, update, and delete courses
- Students can browse and enroll in courses
- Course content and enrollment tracking
- Real-time student progress monitoring

### AI Recommendations
- Personalized course suggestions using Google Gemini AI
- Career outlook and learning path generation
- Skills development recommendations
- Smart course matching based on student goals

### Enrollment System
- Student course enrollment and progress tracking
- Instructor enrollment management
- Completion status and analytics
- Unenrollment capabilities

## Project Structure

```
src/
├── modules/
│   ├── auth/                 # Authentication system
│   ├── course/               # Course management
│   ├── courseEnroll/          # Student enrollment
│   └── ai-recommendation/     # AI recommendations
├── middleware/               # Security middleware
├── config/                  # Database setup
└── server.js                # Main server file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - User profile

### Courses
- `GET /api/course` - Get all courses
- `POST /api/course` - Create new course
- `GET /api/course/:id` - Get course details
- `PUT /api/course/:id` - Update course
- `DELETE /api/course/:id` - Delete course

### Enrollment
- `POST /api/enroll/:courseId/enroll` - Enroll in course
- `GET /api/enroll/student` - Get student enrollments
- `PUT /api/enroll/:enrollmentId/progress` - Update progress

### AI Recommendations
- `POST /api/ai-recommendation/generate` - Get AI recommendations
- `GET /api/ai-recommendation/user` - Get user recommendations

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Configure your database and API keys
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Start production server**
   ```bash
   npm start
   ```

## Security Features

- JWT-based authentication
- Role-based authorization
- Input validation and sanitization
- Rate limiting on API endpoints
- Secure password hashing
- CORS configuration for frontend access

## Database Models

- **User** - Authentication and profile data
- **Course** - Course information and content
- **Enrollment** - Student course relationships
- **AI Recommendation** - Generated recommendations storage

## Development Notes

- Uses modular architecture for maintainability
- Comprehensive error handling and logging
- AI integration with fallback mechanisms
- Scalable database design with proper indexing
- Environment-based configuration management
