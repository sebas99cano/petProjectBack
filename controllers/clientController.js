const clientRouter = require("express").Router();
const Client = require("../models/Client");
const Consult = require("../models/Consult");
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
    //buscamos las mascotas que tenia asociado ese usuario y las borramos
    const pets = await Pet.find({ client: id });
    if (Array.isArray(pets) && pets.length > 0) {
      pets.forEach(async (petElement) => {
        //buscamos las consultas asociadas a cada mascota del usuario y las borramos
        const consults = await Consult.find({ pet: petElement._id });
        if (Array.isArray(consults) && consults.length > 0) {
          await Consult.deleteMany({ pet: petElement._id });
        }
      });
      await Pet.deleteMany({ client: id });
    }
    await Client.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = clientRouter;
