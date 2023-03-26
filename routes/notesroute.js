const express = require("express");
const jwt = require("jsonwebtoken");
const { authmiddleware } = require("../middlewares/authmiddleware");
const { NoteModel } = require("../model/notemodel");
const bcrypt = require("bcrypt");

const noteRouter = express.Router();

noteRouter.get("/", authmiddleware, async (req, res) => {
  const user = req.body.user;
  try {
    const data = await NoteModel.find({ user });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
});

noteRouter.post("/add", authmiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const data = new NoteModel(payload);
    await data.save();
    res.status(200).send({ message: "Note has been added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

noteRouter.delete("/delete/:_id", authmiddleware, async (req, res) => {
  const { _id } = req.params;
  try {
    await NoteModel.findByIdAndDelete({ _id });
    res.status(200).send({ message: "Note has been deleted" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

noteRouter.patch("/update/:_id", authmiddleware, async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  try {
    await NoteModel.findOneAndUpdate({ _id }, payload);
    res.status(200).send({ message: "Note has been updated" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = noteRouter;
