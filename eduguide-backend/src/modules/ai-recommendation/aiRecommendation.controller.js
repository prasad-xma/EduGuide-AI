const AiRecommendation = require('./aiRecommendation.model');
const { generateCourseRecommendations } = require('./googleAi.service');
const Course = require('../course/course.model');

const generateAiRecommendation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { query } = req.body;

        
        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Query is required'
            });
        }

        // Check if there's an existing active recommendation
        const existingRecommendation = await AiRecommendation.findOne({ 
            userId, 
            is_active: true 
        });

        const aiResult = await generateCourseRecommendations(query);

        // Update or create recommendation
        let recommendation;
        if (existingRecommendation) {
            existingRecommendation.query = query;
            existingRecommendation.ai_response = aiResult.ai_response;
            existingRecommendation.response_metadata = aiResult.metadata;
            existingRecommendation.is_active = true;
            
            recommendation = await existingRecommendation.save();

        } else {
            recommendation = new AiRecommendation({
                userId,
                query,
                ai_response: aiResult.ai_response,
                response_metadata: aiResult.metadata
            
            });
            
            await recommendation.save();
        }

        const recommendedTitles = Array.isArray(aiResult?.ai_response?.recommended_courses)
            ? aiResult.ai_response.recommended_courses
                .map(rc => rc && typeof rc.title === 'string' ? rc.title : null)
                .filter(Boolean)
            : [];

        const recommendedCourses = recommendedTitles.length > 0
            ? await Course.find({ title: { $in: recommendedTitles } })
            : [];

        return res.status(200).json({
            success: true,
            message: 'AI recommendations generated successfully',
            data: {
                recommendation,
                recommendedCourses
            }
        });

    } catch (error) {
        console.error('generateAiRecommendation error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to generate recommendations',
            error: error.message
        });
    }
};

// get user recommendations
const getUserRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;

        const recommendation = await AiRecommendation.findOne({ 
            userId, 
            is_active: true 
        })
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 });

        if (!recommendation) {
            return res.status(404).json({
                success: false,
                message: 'No recommendation found'
            });
        }

        // extract course titles 
        const recommendedTitles = Array.isArray(recommendation?.ai_response?.recommended_courses)
            ? recommendation.ai_response.recommended_courses
                .map(rc => rc && typeof rc.title === 'string' ? rc.title : null)
                .filter(Boolean)
            : [];

        const recommendedCourses = recommendedTitles.length > 0
            ? await Course.find({ title: { $in: recommendedTitles } })
            : [];

        return res.status(200).json({
            success: true,
            data: {
                recommendation,
                recommendedCourses
            }
        });

    } catch (error) {
        console.error('getUserRecommendations error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// update recommendation
const updateRecommendation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { query } = req.body;

        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Query is required'
            });
        }

        // generate course recommendations
        const aiResult = await generateCourseRecommendations(query);

        // update recommendation
        const recommendation = await AiRecommendation.findOneAndUpdate(
            { userId, is_active: true },
            { 
                query,
                ai_response: aiResult.ai_response,
                response_metadata: aiResult.metadata
            },
            { new: true }
        );

        if (!recommendation) {
            return res.status(404).json({
                success: false,
                message: 'Recommendation not found'
            });
        }

        // get recommended course titles
        const recommendedTitles = Array.isArray(aiResult?.ai_response?.recommended_courses)
            ? aiResult.ai_response.recommended_courses
                .map(rc => rc && typeof rc.title === 'string' ? rc.title : null)
                .filter(Boolean)
            : [];

        const recommendedCourses = recommendedTitles.length > 0
            ? await Course.find({ title: { $in: recommendedTitles } })
            : [];

        return res.status(200).json({
            success: true,
            message: 'Recommendation updated successfully',
            data: {
                recommendation,
                recommendedCourses
            }
        });

    } catch (error) {
        console.error('updateRecommendation error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update recommendation',
            error: error.message
        });
    }
};

// delete recommendation
const deleteRecommendation = async (req, res) => {
    try {
        const userId = req.user.id;

        const recommendation = await AiRecommendation.findOneAndDelete(
            { userId, is_active: true }
        );

        if (!recommendation) {
            return res.status(404).json({
                success: false,
                message: 'Recommendation not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Recommendation deleted successfully'
        });

    } catch (error) {
        console.error('deleteRecommendation error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    generateAiRecommendation,
    getUserRecommendations,
    updateRecommendation,
    deleteRecommendation
};
