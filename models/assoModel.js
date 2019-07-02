const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assoSchema = new Schema({
  name: { type: String },
  since: { type: Number },
  theyDo: { type: String },
  lastMission: { type: String },
  linkSite: { type: String },
  linkMoney: { type: String },
  categoryAsso: {
    type: String,
    enum: ["culture", "environment", "health", "solidarity"]
  }
  // id_tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
  // image: { type: String, alt="ici logo" }
});
const assoModel = mongoose.model("assos", assoSchema);
module.exports = assoModel;
