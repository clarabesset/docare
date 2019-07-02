const express = require("express");
const router = new express.Router();
const assosModel = require("../models/assoModel");
const dataAsso = require("../dataAssos");

function insertdb() {
  assosModel
    .insertMany(dataAsso)
    .then(res => console.log("success data inserted"))
    .catch(err => console.log(err));
}

// insertdb();

module.exports = router;
