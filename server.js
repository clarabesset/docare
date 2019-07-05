require("dotenv").config();
require("./config/dbconnect");
require("./config/cloudinary");
require("./utils/helpers-hbs");
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
app.use(adminRouter);

const listener = app.listen(process.env.PORT || 3333, () => {
  console.log(`app started at ${process.env.SITE_URL}`);
});
