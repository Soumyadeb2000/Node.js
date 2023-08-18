const express = require('express');

const premiumController = require('../controllers/premium');

const router = express.Router();

router.get('/showLeaderboard', premiumController.leaderboards);

module.exports = router;