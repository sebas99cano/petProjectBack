const petRouter = require("express").Router();
const Client = require("../models/Client");
const Pet = require("../models/Pet");

petRouter.get("/", async (request, response, next) => {
  try {
    const medicaments = await Pet.find()
      .populate("client", { dni: 1, name: 1, direction: 1, phone: 1 })
      .populate("medicament");
    response.json(medicaments);
  } catch (error) {
    next(error);
  }
});

petRouter.post("/", async (request, response, next) => {
  const { name, race, age, weight, clientId } = request.body;
  try {
    const client = await Client.findById(clientId);
    const newPet = new Pet({
      name,
      race,
      age,
      weight,
      client: client._id,
    });
    const savedPet = await newPet.save();
    client.pets = client.pets.concat(savedPet._id);
    await client.save();
    response.json(savedPet);
  } catch (error) {
    next(error);
  }
});

petRouter.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const pet = request.body;
  const newPetInfo = {
    name: pet.name,
    race: pet.race,
    age: pet.age,
    weight: pet.weight,
  };
  Pet.findByIdAndUpdate(id, newPetInfo, { new: true })
    .then((updatePet) => {
      response.json(updatePet);
    })
    .catch((error) => next(error));
});

module.exports = petRouter;
