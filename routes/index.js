const express = require("express");
const router = new express.Router();

router.get(["/", "/home"], (req, res) => {
  res.render("index", { nav: false });
});

router.get(["/assos"], (req, res) => {
  res.render("assos", { nav: true });
});

module.exports = router;
