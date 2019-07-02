const express = require("express");
const router = new express.Router();
const assosModel = require("./../models/assoModel");
const dataAsso = require("./../dataAssos");

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

router.get("/createasso", (req, res) => {
  res.render("upload", { nav: true });
});
// router.post("/oneasso", uploaderMiddleware.single("image_asso"), (req, res) => {
//   const { name, since, theyDo } = req.body;
//   const newAsso = {
//     id,
//     name,
//     since,
//     theyDo,
//     lastMission,
//     linkSite,
//     linkMoney,
//     categoryAsso,
//     image
//   };
//   if (req.file) newAsso.image = req.file.secure_url;
//   assosModel
//     .create(newAsso)
//     .then(dbRes => {
//       res.redirect("/assos");
//     })
//     .catch(error => {
//       console.log("db problem !!!");
//       console.log(error);
//     });
// });

function insertdb() {
  assosModel
    .insertMany(dataAsso)
    .then(res => console.log("success data inserted"))
    .catch(err => console.log(err));
}

// insertdb();

module.exports = router;
