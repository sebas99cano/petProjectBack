const { model, Schema } = require("mongoose");

const petSchema = new Schema({
  name: String,
  race: String,
  age: String,
  weight: Number,
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  consults: [
    {
      type: Schema.Types.ObjectId,
      ref: "Consult",
    },
  ],
});

petSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
