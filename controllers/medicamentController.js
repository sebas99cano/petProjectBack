const medicamentRouter = require("express").Router();
const Medicament = require("../models/Medicament");

medicamentRouter.get("/", async (request, response, next) => {
  try {
    const medicaments = await Medicament.find();
    response.json(medicaments);
  } catch (error) {
    next(error);
  }
});

medicamentRouter.post("/", async (request, response, next) => {
  const { name, description, dosis } = request.body;
  const newMedicament = new Medicament({
    name,
    description,
    dosis,
  });

  try {
    const savedMedicament = await newMedicament.save();
    response.status(201).json(savedMedicament);
  } catch (error) {
    next(error);
  }
});

medicamentRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const updatedMedicament = await Medicament.findByIdAndUpdate(
      id,
      request.body,
      { new: true }
    );
    response.json(updatedMedicament);
  } catch (error) {
    next(error);
  }
});

medicamentRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    await Medicament.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = medicamentRouter;
