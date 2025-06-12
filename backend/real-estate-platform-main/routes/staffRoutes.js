const express = require('express');
const router = express.Router();
const { getPerformanceTiers } = require('../controllers/performanceTierController');
const { getPerformanceStats } = require('../controllers/performanceStatsController');

router.get('/performance-tiers', getPerformanceTiers);
router.get('/performance-stats', getPerformanceStats);

module.exports = router;
