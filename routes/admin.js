const express = require("express");
const router = new express.Router();
const assosModel = require("../models/assoModel");
const userModel = require("../models/userModel");
const dataAsso = require("../dataAssos");
const fileUploader = require("../config/cloudinary.js");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
router.get(["/add"], (req, res, next) => {
  assosModel
    .find()
    .then(assos => {
      res.render("add", { assos, nav: true });
    })
    .catch(err => {
      console.log(err);
    });
});
router.post("/add", fileUploader.single("image"), (req, res, next) => {
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
router.post("/edit_asso/:id", fileUploader.single("image"), (req, res) => {
  // const imgUrl = req.file.secure_url;
  // req.body.image = imgUrl;
  assosModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect("/assos"))
    .catch(() => res.render("edit", { errormessage: "edit didn't works" }));
});
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
insertdb();
// -------------------------------------SIGN UP/ LOGIN / LOGOUT
router.get("/login-signup", (req, res, next) => {
  res.render("login-signup", { nav: true });
});
router.post("/signup", (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  let password = req.body.password;
  if (firstname === "" || lastname === "" || email === "" || password === "") {
    res.render("login-signup", {
      errorMessage: "Please fill in all the information to sign up"
    });
    return;
  }
  userModel
    .findOne({ email: email })
    .then(dbRes => {
      if (dbRes) {
        res.render("login-signup", {
          errorMessage: "This email adress already exists"
        });
        return;
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        req.body.password = hashPass;
        userModel
          .create(req.body)
          .then(() => {
            res.redirect("/assos");
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});
router.post("/login", (req, res, next) => {
  const theUserEmail = req.body.email;
  const theUserPassword = req.body.password;
  if (theUserEmail === "" || theUserPassword === "") {
    res.render("login-signup", {
      errorMessage: "Please enter both, usermail and userpassword to sign up."
    });
    return;
  }
  userModel
    .findOne({ email: theUserEmail })
    .then(user => {
      if (!user) {
        res.render("login-signup", {
          errorMessage: "The email doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(theUserPassword, user.password)) {
        console.log(req.session);
        res.redirect("/assos");
      } else {
        res.render("login-signup", { errorMessage: "Incorrect password" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});
router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    // can't access session here
    res.redirect("/assos");
  });
});
module.exports = router;
