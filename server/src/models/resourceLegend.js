const mongoose = require("mongoose");
const { ResourceTitles } = require("../constant/enum");
const ResourceLegendSchema = new mongoose.Schema({
  title: { type: String, enum: ResourceTitles, required: true, unique: true },
  color: { type: String }, // Hex code
  icon_url: { type: String },
});

const ResourceLegend =
  mongoose.models.ResourceLegend || mongoose.model("ResourceLegend", ResourceLegendSchema);

module.exports = {
  ResourceLegend,
  ResourceLegendSchema,
};
