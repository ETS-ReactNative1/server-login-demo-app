const { Auth } = require("../controllers/Auth");

const express = require("express"),
  router = express.Router();

router.post("/login", Auth.login);
router.post("/signup", Auth.signup);

module.exports = router;
