const express = require("express"),
  router = express.Router(),
  authRoutes = require('./auth');


router.use('/auth', authRoutes)

module.exports = router;
