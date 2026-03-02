const { GoogleGenerativeAI } = require('@google/generative-ai');
const Course = require('../course/course.model');

const generateCourseRecommendations = async (query) => {
    try {
        // console.log('GEMINI_API_KEY from env:', process.env.GEMINI_API_KEY ? 'Found' : 'Not found');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        
        const availableCourses = await Course.find({}, 'title description');
        console.log('Found courses:', availableCourses.length);
        if (availableCourses.length === 0) {
            console.log('No courses found in database');
            throw new Error('No courses available in database');
        }
        const courseList = availableCourses.map(course => `- ${course.title}: ${course.description}`).join('\n');
        
        const prompt = `As an educational career advisor, provide comprehensive course recommendations for someone who says: "${query}"

Available courses in our system:
${courseList}

Please provide a detailed response in the following JSON format:
{
  "recommended_courses": [
    {
      "title": "Exact course title from the available list",
      "description": "Why this course is relevant",
      "level": "Beginner/Intermediate/Advanced",
      "duration": "Estimated duration",
      "prerequisites": ["List of prerequisites if any"]
    }
  ],
  "learning_path": [
    "Step-by-step learning path sequence"
  ],
  "skills_to_develop": [
    "Key skills that will be developed"
  ],
  "career_outlook": "Career prospects and opportunities",
  "additional_tips": [
    "Additional advice for success"
  ]
}

Important: Only recommend courses from the available list above. Match titles exactly. Focus on practical, actionable advice. Ensure the response is valid JSON format.`;

        const startTime = Date.now();
        const result = await model.generateContent(prompt);
        const responseTime = Date.now() - startTime;
        
        const response = result.response;
        const text = response.text();
        
        let aiResponse;
        try {
            const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
            aiResponse = JSON.parse(cleanText);
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            throw new Error('Invalid AI response format');
        }
        
        return {
            ai_response: aiResponse,
            metadata: {
                model_used: 'gemini-2.5-flash',
                response_time_ms: responseTime,
                generated_at: new Date()
            }
        };
        
    } catch (error) {
        console.error('Google AI API error details:', error.message);
        console.error('Full error object:', error);
        console.error('Error stack:', error.stack);
        throw new Error('Failed to generate course recommendations');
    }
};

module.exports = {
    generateCourseRecommendations
};
