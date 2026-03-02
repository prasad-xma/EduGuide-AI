const mongoose = require('mongoose');

const aiRecommendationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    query: {
        type: String,
        required: true,
        trim: true
    },
    ai_response: {
        recommended_courses: [{
            title: String,
            description: String,
            level: String,
            duration: String,
            prerequisites: [String]
        }],
        learning_path: [String],
        skills_to_develop: [String],
        career_outlook: String,
        additional_tips: [String]
    },
    response_metadata: {
        model_used: String,
        response_time_ms: Number,
        generated_at: {
            type: Date,
            default: Date.now
        }
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

aiRecommendationSchema.index({ userId: 1 });

module.exports = mongoose.model('AiRecommendation', aiRecommendationSchema);
