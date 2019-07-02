const express = require("express");
const router = new express.Router();
const assosModel = require("./../models/assoModel");
router.get(["/", "/home"], (req, res) => {
  res.render("index", { nav: false });
});

router.get(
  ["/assos", "/culture", "/enviro", "/health", "/solida"],
  (req, res) => {
    var cat = req.url.substring(1);
    if (cat == "assos") {
      assosModel
        .find()
        .then(assos => {
          console.log("toto");
          res.render("assos", { nav: true, assos });
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }
    assosModel
      .find({ categoryAssos: cat })
      .then(assos => {
        res.render("assos", { assos });
      })
      .catch(err => {
        res.render("404");
      });
  }
);

module.exports = router;
