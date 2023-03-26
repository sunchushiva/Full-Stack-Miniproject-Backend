const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connection = mongoose.connect(process.env.BACKENDURL);

const noteSchema = mongoose.Schema({
  title: String,
  body: String,
  subject: String,
  user: String,
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  connection,
  NoteModel,
};
