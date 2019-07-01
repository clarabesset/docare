const express = require("express");
const router = new express.Router();

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

module.exports = router;
