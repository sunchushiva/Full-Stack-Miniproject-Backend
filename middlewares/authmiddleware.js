const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = await jwt.verify(token, "secret");
      if (decoded) {
        req.body.user = decoded.user;
        // console.log(decoded.user);
        next();
      } else {
        res.status(400).send({ messsage: "Some error occured" });
      }
    } catch (err) {
      res.status(400).send({ messsage: "Invalid authorization token" });
    }
  } else {
    res.status(400).send({ messsage: "Restricted route, login required" });
  }
};

module.exports = { authmiddleware };
