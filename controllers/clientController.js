const clientRouter = require("express").Router();
const Client = require("../models/Client");
const Pet = require("../models/Pet");

clientRouter.get("/", async (request, response, next) => {
  try {
    const clients = await Client.find();
    response.json(clients);
  } catch (error) {
    next(error);
  }
});

clientRouter.post("/", async (request, response, next) => {
  const { dni, name, lastName, direction, phone } = request.body;
  const newClient = new Client({
    dni,
    name,
    lastName,
    direction,
    phone,
  });

  try {
    const savedClient = await newClient.save();
    response.status(201).json(savedClient);
  } catch (error) {
    next(error);
  }
});

clientRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const updatedClient = await Client.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.json(updatedClient);
  } catch (error) {
    next(error);
  }
});

clientRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const deletedClient = await Client.findByIdAndRemove(id);
    await Pet.deleteMany({ client: deletedClient.id });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = clientRouter;
