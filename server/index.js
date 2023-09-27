const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routers/user");
const Country = require("./routers/country");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
const dbURL = require("./db");
mongoose
  .connect(dbURL, {})
  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use("/users", userRoutes);
app.use("/country", Country);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
