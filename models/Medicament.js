const { model, Schema } = require("mongoose");

const medicamentSchema = new Schema({
  name: String,
  description: String,
  dosis: String,
});

medicamentSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Medicament = model("Medicament", medicamentSchema);

module.exports = Medicament;
