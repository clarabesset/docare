const express = require("express");
const router = new express.Router();
const assosModel = require("./../models/assoModel");
router.get(["/", "/home"], (req, res) => {
  res.render("index", { nav: false });
});

router.get(
  ["/assos", "/culture", "/environment", "/health", "/solidarity"],
  (req, res) => {
    var cat = req.url.substring(1);
    if (cat == "assos") {
      assosModel
        .find()
        .then(assos => {
          console.log(assos[0]);
          res.render("assos", { nav: true, assos });
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }
    assosModel
      .find({ categoryAsso: cat })
      .then(assos => {
        res.render("assos", { assos, nav: true });
      })
      .catch(err => {
        res.render("404");
      });
  }
);

router.get("/one_asso/:id", (req, res) => {
  assosModel
    .findById(req.params.id)
    .then(asso => res.render("one_asso", { nav: true, asso }))
    .catch(err => console.log(err));
});

module.exports = router;
