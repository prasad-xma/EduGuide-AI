const express = require('express');
const { authenticateToken } = require('../../middleware/auth.middleware');
const {
    generateAiRecommendation,
    getUserRecommendations,
    updateRecommendation,
    deleteRecommendation
} = require('./aiRecommendation.controller');

const router = express.Router();

router.use(authenticateToken);

router.post('/generate', generateAiRecommendation);

router.get('/', getUserRecommendations);

router.put('/', updateRecommendation);

router.delete('/', deleteRecommendation);

module.exports = router;
