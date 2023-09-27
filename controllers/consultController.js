const Consult = require("../models/Consult");
const Pet = require("../models/Pet");

const consultRouter = require("express").Router();

consultRouter.get("/", async (request, response, next) => {
  try {
    const consults = await Consult.find()
      .populate("pet", { consults: 0 })
      .populate("medicaments", { name: 1 });
    response.json(consults);
  } catch (error) {
    next(error);
  }
});

consultRouter.post("/", async (request, response, next) => {
  const { description, petId, medicamentsId } = request.body;
  try {
    const pet = await Pet.findById(petId);

    const newConsult = new Consult({
      date: new Date(),
      description: description,
      pet: pet._id,
      medicaments: medicamentsId,
    });

    const savedConsult = await newConsult.save();

    pet.consults = pet.consults.concat(savedConsult._id);
    await pet.save();

    response.json(savedConsult);
  } catch (error) {
    next(error);
  }
});

consultRouter.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const consult = request.body;
  const newConsultInfo = {
    description: consult.description,
    pet: consult.petId,
    medicaments: consult.medicamentsId,
  };
  Consult.findByIdAndUpdate(id, newConsultInfo, { new: true })
    .then((updatedConsult) => {
      response.json(updatedConsult);
    })
    .catch((error) => next(error));
});

consultRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const consultDelete = await Consult.findByIdAndRemove(id);
    const petByConsult = await Pet.findOne({ _id: consultDelete.pet });
    petByConsult.consults = petByConsult.consults.filter(
      (consultElement) => consultElement._id !== consultDelete.pet
    );
    petByConsult.save();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = consultRouter;
