require("dotenv").config();
require("./database/mongo");
const express = require("express");
const cors = require("cors");
const logger = require("./middleware/loggerMiddleware");
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");
const medicamentRouter = require("./controllers/medicamentController");
const clientRouter = require("./controllers/clientController");
const petRouter = require("./controllers/petController");
const consultRouter = require("./controllers/consultController");

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.get("/", (request, response) => {
  response.send(
    "<h1>Bienvenido al backend de Juan Sebastian Cano Grajales</h1><br/><p>PETS S.A. es un centro veterinario ubicado en la ciudad de Cartagena. Actualmente sus procesos de registros y control de información son muy manuales y se lleva a través de un archivo en MS Excel. Según solicitud del administrador, requiere que toda la información esté dentro de una aplicación web que le facilite mejor control de los datos y generación de informes a través de vistas o tablas. La información que suministra el centro está relacionada con: Información de mascotas (Identificación, Nombre, Raza, Edad, Peso, medicamento, cliente) Información de clientes (Cedula, Nombres, Apellidos, Dirección, Teléfono) Información de medicamentos (Nombre, Descripción, dosis) Se requiere: Realizar el diagrama de clases. (5 puntos) Crear CRUD sobre la información referenciada anteriormente.(20 puntos) Desarrollar un reporte sobre medicamentos y clientes.(15 puntos) Aprendizaje independiente. Puede ser una funcionalidad adicional (10 puntos).</p>"
  );
});

app.use("/api/client", clientRouter);

app.use("/api/pet", petRouter);

app.use("/api/consult", consultRouter);

app.use("/api/medicament", medicamentRouter);

app.use(notFound);

app.use(handleErrors);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
