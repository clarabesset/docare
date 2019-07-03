const express = require("express");
const router = new express.Router();
const assosModel = require("../models/assoModel");
const dataAsso = require("../dataAssos");
const uploaderMiddleware = require("../config/cloudinary.js");

router.get(["/add"], (req, res) => {
  assosModel
    .find()
    .then(assos => {
      res.render("add", { assos, nav: true });
    })
    .catch(err => {
      console.log(err);
    });
});

// router.get("/assos", (req, res) => {
//   console.log("ici");
//   assosModel
//     .find()
//     .then(dbRes => {
//       console.log(dbRes);
//       res.render("assos", { nav: true }, { assos: dbRes });
//     })
//     .catch(dbErr => console.log(dbErr));
// });

router.post("/add", uploaderMiddleware.single("image"), (req, res, next) => {
  const {
    name,
    since,
    theyDo,
    lastMission,
    linkSite,
    linkMoney,
    categoryAsso,
    image
  } = req.body;
  const newAsso = new assosModel({
    name,
    since,
    theyDo,
    lastMission,
    linkSite,
    linkMoney,
    categoryAsso,
    image
  });
  if (req.file) assoModel.image = req.file.secure_url;
  assosModel
    .create(newAsso)
    .then(dbRes => {
      res.redirect("/assos");
    })
    .catch(error => {
      console.log("db problem !!!");
      console.log(error);
    });
});

router.get("/edit_asso/:id", (req, res) => {
  assosModel
    .findById(req.params.id)
    .then(edit => {
      res.render("edit", { edit, nav: true });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post(
  "/edit_asso/:id",
  uploaderMiddleware.single("image"),
  (req, res) => {
    // const imgUrl = req.file.secure_url;
    // req.body.image = imgUrl;
    assosModel
      .findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.redirect("/assos"))
      .catch(() => res.render("edit", { errormessage: "edit didn't works" }));
  }
);

router.get("/delete_asso/:id", (req, res) => {
  assosModel
    .findByIdAndRemove(req.params.id)
    .then(sucess => res.redirect("/add"))
    .catch(error => res.redirect("/add"));
});

function insertdb() {
  assosModel
    .insertMany(dataAsso)
    .then(res => console.log("success data inserted"))
    .catch(err => console.log(err));
}

// insertdb();

module.exports = router;
