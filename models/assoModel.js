const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  since: { type: Number },
  theyDo: { type: String },
  lastMission: { type: String },
  linkMoney: { type: String },
  category: { type: String, enum: ["culture", "enviro", "health", "solida"] },
  // id_tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
  image: { type: String, alt="ici logo" }
});
const assoModel= mongoose.model("assos", assoSchema);
module.exports = assoModel;