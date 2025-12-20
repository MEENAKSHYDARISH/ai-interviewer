const router = require("express").Router();
router.post("/questions", (req, res) => {
  // store in DB later
  res.json({ success: true });
});

module.exports = router;
