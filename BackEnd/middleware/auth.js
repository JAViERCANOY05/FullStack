const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user.model.js");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(401).send("No token");
    }

    const decoded = jsonwebtoken.verify(token, "mySecretKey");
    console.log(decoded , "+___________________")
    const user = await User.findOne({
      _id: decoded._id,
    });
    console.log(user , "+123123123123")

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Unauthorize request");
  }
};

module.exports = auth;
