const router = require("express").Router();

router.get("/start", (req, res) => {
  res.json({
    question: "Tell me about yourself.",
  });
});

router.post("/answer", (req, res) => {
  res.json({ status: "Answer received" });
});

module.exports = router;
