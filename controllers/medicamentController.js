const medicamentRouter = require("express").Router();
const Consult = require("../models/Consult");
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
    const medicamentDeleted = await Medicament.findByIdAndRemove(id);
    const consults = await Consult.find({
      medicaments: { $in: [medicamentDeleted._id] },
    });

    if (Array.isArray(consults) && consults.length > 0) {
      consults.forEach(async (consultElement) => {
        consultElement.medicaments = consultElement.medicaments.filter(
          (medicamentId) =>
            medicamentId.toString() !== medicamentDeleted._id.toString()
        );
        await consultElement.save();
      });
    }

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = medicamentRouter;
