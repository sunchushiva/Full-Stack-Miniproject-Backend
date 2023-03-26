const express = require("express");
const noteRouter = require("./routes/notesroute");
const { connection } = require("./model/notemodel");
const userRouter = require("./routes/userroute");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/notes", noteRouter);
app.use("/", userRouter);

app.listen(8080, async () => {
  try {
    console.log("Server started at 8080");
    await connection;
    console.log("MongoDB connected");
  } catch {
    console.log("Couldn't connect to MongoDB");
  }
});
