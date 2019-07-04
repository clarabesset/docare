const express = require("express");
const router = new express.Router();
const assosModel = require("./../models/assoModel");
router.get(["/", "/home"], (req, res) => {
  res.render("index", { nav: false });
});

const campagnes = [
  {
    image: "baamPUB.png",
    href: "https://www.aides.org/campagne/lhomophobie-frappe-toujours"
  },
  {
    image: "biblioPUB.png",
    href: "https://www.aides.org/campagne/lhomophobie-frappe-toujours"
  },
  {
    image: "polliniPUB.png",
    href: "https://www.aides.org/campagne/lhomophobie-frappe-toujours"
  },
  {
    image: "aidesPUB.png",
    href: "https://www.aides.org/campagne/lhomophobie-frappe-toujours"
  }
];

router.get(
  ["/assos", "/culture", "/environment", "/health", "/solidarity"],
  (req, res) => {
    var cat = req.url.substring(1);
    if (cat == "assos") {
      assosModel
        .find()
        .then(assos => {
          const copy = [];

          var count = 0;
          assos.forEach((asso, i, arr) => {
            // console.log(count);
            copy.push(asso);
            let c = campagnes[count];
            // arr.splice(i + 1, 0, );
            (c.isCampagne = true), copy.push(c);
            count = count + 1 === 4 ? 0 : count + 1;
          });

          // console.log(assos[0]);
          res.render("assos", { nav: true, assos: copy });
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
