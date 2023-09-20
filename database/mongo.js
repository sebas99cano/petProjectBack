const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
const connectionString = process.env.MONGO_DB_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });
