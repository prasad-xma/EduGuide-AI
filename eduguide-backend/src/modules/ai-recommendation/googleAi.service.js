const { GoogleGenerativeAI } = require('@google/generative-ai');
const Course = require('../course/course.model');

const extractJsonObjectFromText = (text) => {
    if (typeof text !== 'string') return null;

    // remove code fences if present
    const withoutFences = text.replace(/```json\s*|```\s*/gi, '').trim();

    // check if the text is a direct JSON object
    const direct = withoutFences.trim();
    if (direct.startsWith('{') && direct.endsWith('}')) {
        return direct;
    }

    // find the first opening brace
    const firstBrace = withoutFences.indexOf('{');
    if (firstBrace === -1) return null;

    let depth = 0;
    let inString = false;
    let escape = false;
    for (let i = firstBrace; i < withoutFences.length; i++) {
        const ch = withoutFences[i];

        if (inString) {
            if (escape) {
                escape = false;
            } else if (ch === '\\') {
                escape = true;
            } else if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
            continue;
        }

        if (ch === '{') depth++;
        if (ch === '}') depth--;

        if (depth === 0) {
            return withoutFences.slice(firstBrace, i + 1);
        }
    }

    return null;
};

// parse AI JSON response
const parseAiJsonResponse = (text) => {
    const candidate = extractJsonObjectFromText(text);
    if (!candidate) {
        throw new Error('Invalid AI response format');
    }

    try {
        return JSON.parse(candidate);
    } catch {
        throw new Error('Invalid AI response format');
    }
};

// normalize AI response
const normalizeAiResponse = (aiResponse, allowedTitles) => {
    const normalized = (aiResponse && typeof aiResponse === 'object') ? aiResponse : {};

    // get recommended courses from normalized response
    const recommendedCourses = Array.isArray(normalized.recommended_courses)
        ? normalized.recommended_courses
        : [];

    // filter and map recommended courses
    const filteredRecommendedCourses = recommendedCourses
        .filter(rc => rc && typeof rc === 'object')
        .filter(rc => typeof rc.title === 'string')
        .filter(rc => allowedTitles.has(rc.title))
        .map(rc => ({
            title: rc.title,
            description: typeof rc.description === 'string' ? rc.description : '',
            level: typeof rc.level === 'string' ? rc.level : '',
            duration: typeof rc.duration === 'string' ? rc.duration : '',
            prerequisites: Array.isArray(rc.prerequisites) ? rc.prerequisites.filter(p => typeof p === 'string') : []
        }));

    
    return {
        recommended_courses: filteredRecommendedCourses,
        learning_path: Array.isArray(normalized.learning_path) ? normalized.learning_path.filter(s => typeof s === 'string') : [],
        skills_to_develop: Array.isArray(normalized.skills_to_develop) ? normalized.skills_to_develop.filter(s => typeof s === 'string') : [],
        career_outlook: typeof normalized.career_outlook === 'string' ? normalized.career_outlook : '',
        additional_tips: Array.isArray(normalized.additional_tips) ? normalized.additional_tips.filter(s => typeof s === 'string') : []
    };
};

const generateCourseRecommendations = async (query) => {
    try {
        // console.log('GEMINI_API_KEY from env:', process.env.GEMINI_API_KEY ? 'Found' : 'Not found');

        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not configured');
        }
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            generationConfig: {
                responseMimeType: 'application/json'
            }
        });
        
        // get available courses from database
        const availableCourses = await Course.find({}, 'title description');
        console.log('Found courses:', availableCourses.length);

        // check if no courses found
        if (availableCourses.length === 0) {
            console.log('No courses found in database');
            throw new Error('No courses available in database');
        }

        // create set of allowed course titles
        const allowedTitles = new Set(availableCourses.map(c => c.title));
        const courseList = availableCourses.map(course => `- ${course.title}: ${course.description}`).join('\n');
        
        // create prompt
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
        
        const strictPrompt = `\n\nReturn ONLY valid JSON. Do not include markdown fences, explanations, greetings, or any extra text. If you are unable to recommend anything, still return valid JSON with empty arrays.`;

        let aiResponse;
        try {
            aiResponse = parseAiJsonResponse(text);
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            console.error('AI raw response (first 500 chars):', typeof text === 'string' ? text.slice(0, 500) : text);

            const retryStartTime = Date.now();
            const retryResult = await model.generateContent(prompt + strictPrompt);
            const retryText = retryResult.response.text();

            aiResponse = parseAiJsonResponse(retryText);
            const retryResponseTime = Date.now() - retryStartTime;

            const normalizedRetry = normalizeAiResponse(aiResponse, allowedTitles);
            return {
                ai_response: normalizedRetry,
                metadata: {
                    model_used: 'gemini-2.5-flash',
                    response_time_ms: retryResponseTime,
                    generated_at: new Date()
                }
            };
        }

        const normalized = normalizeAiResponse(aiResponse, allowedTitles);
        
        return {
            ai_response: normalized,
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
        throw new Error(error.message || 'Failed to generate course recommendations');
    }
};

module.exports = {
    generateCourseRecommendations
};
