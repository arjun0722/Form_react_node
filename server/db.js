
const mongoose = require("mongoose");

const URL =
  "mongodb+srv://Arjun:arjun2001@cluster0.kxwgy4l.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URL, {})
  .then((result) => console.log(`Database connected`))
  .catch((err) => console.log(err));

module.exports = URL;
