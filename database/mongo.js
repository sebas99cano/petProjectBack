const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
const connectionString = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@fullstack.9nl1oab.mongodb.net/${process.env.DATA_BASE}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });
