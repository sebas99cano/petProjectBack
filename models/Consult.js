const { model, Schema } = require("mongoose");

const consultSchema = new Schema({
  date: Date,
  description: String,
  pet: {
    type: Schema.Types.ObjectId,
    ref: "Pet",
  },
  medicaments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Medicament",
    },
  ],
});

consultSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Consult = model("Consult", consultSchema);

module.exports = Consult;
