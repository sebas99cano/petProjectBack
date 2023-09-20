const { model, Schema } = require("mongoose");

const clienteSchema = new Schema({
  dni: String,
  name: String,
  lastName: String,
  direction: String,
  phone: String,
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

clienteSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Client = model("Client", clienteSchema);

module.exports = Client;
