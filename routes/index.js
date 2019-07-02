const express = require("express");
const router = new express.Router();

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get(["/assos"], (req, res) => {
  res.render("assos");
});

module.exports = router;
