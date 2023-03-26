const express = require("express");
const jwt = require("jsonwebtoken");
const { SignModel } = require("../model/usermodel");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/auth", async (req, res) => {
  const { email, password, age, location } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        const user = new SignModel({ email, password: hash, age, location });
        await user.save();
        res.status(200).send({ message: "User signed-in successfully" });
      } else {
        res.status(400).send({ message: err.message });
      }
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await SignModel.find({ email });
    const user = result[0]._id;
    bcrypt.compare(password, result[0].password, async (err, result) => {
      if (result) {
        res.status(200).send({
          message: "User logged-in successfully",
          token: jwt.sign(
            {
              user,
            },
            "secret",
            { expiresIn: "1h" }
          ),
          email,
        });
      } else {
        res.status(400).send({ message: err.message });
      }
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRouter;
