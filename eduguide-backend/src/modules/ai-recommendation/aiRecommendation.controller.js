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

        const existingRecommendation = await AiRecommendation.findOne({ 
            userId, 
            is_active: true 
        });

        const aiResult = await generateCourseRecommendations(query);

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

        const recommendedCourses = await Course.find({
            title: { $in: aiResult.ai_response.recommended_courses.map(rc => rc.title) }
        });

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

        const recommendedCourses = await Course.find({
            title: { $in: recommendation.ai_response.recommended_courses.map(rc => rc.title) }
        });

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

        const aiResult = await generateCourseRecommendations(query);

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

        const recommendedCourses = await Course.find({
            title: { $in: aiResult.ai_response.recommended_courses.map(rc => rc.title) }
        });

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
