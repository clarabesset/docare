require("dotenv").config();
require("./config/dbconnect");
const mongoose = require("mongoose");
const session = require("express-session");
const express = require("express");
const hbs = require("hbs");
const app = express();
app.locals.site_url = process.env.SITE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");

const basePageRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
app.use(basePageRouter);

// IL MANQUE LES PARAMETRES DE LOGIN, A VOIR PLUS TARD

// app.use(basePageRouter);
// app.use(adminRouter);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(`app started at ${process.env.SITE_URL}`);
});
