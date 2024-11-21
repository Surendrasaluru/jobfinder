const jwt = require("jsonwebtoken");
const User = require("../model/userModal");

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies; //extracting token form cokkies.
    if (!token) {
      return res.status(401).json({ message: "unauthorized user" });
    }

    const decodedObj = await jwt.verify(token, "surendrad2731");
    const { _id } = decodedObj; //manam payload lo pampina id ni extract chesi user ni find chestam

    const user = await User.findOne({ _id });

    if (!user) {
      throw new Error("user not logged in");
    }
    req.user = user;
    next();
  } catch (err) {
    //console.log(err.message);
    res.json({ message: "invalid user" });
  }
};

module.exports = verifyToken;
