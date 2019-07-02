const express = require("express");
const router = new express.Router();
const assosModel = require("./../models/assosModel");
const uploaderMiddleware = require("../config/cloudinary.js");
router.get("/assos", (req, res) => {
  assosModel
    .find()
    .then(dbRes => {
      res.render("assos", { assos: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});
router.get("/createasso", (req, res) => {
  res.render("upload");
});
router.post("/oneasso", uploaderMiddleware.single("image_asso"), (req, res) => {
  const { name, since, theyDo } = req.body;
  const newAsso = {
    id,
    name,
    since,
    theyDo,
    lastMission,
    linkSite,
    linkMoney,
    categoryAsso,
    image
  };
  if (req.file) newAsso.image = req.file.secure_url;
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
module.exports = router;
