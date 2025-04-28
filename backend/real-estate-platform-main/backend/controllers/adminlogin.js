const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminRouter = require("express").Router();
const Admin = require("../models/Admin");

const SECRET = "bearer";

AdminRouter.post("/", async (request, response) => {
  try {
    const { adminId, password } = request.body;

    const user = await Admin.findOne({ adminId });

    if (!user) {
      return response
        .status(401)
        .json({ error: "Invalid admin ID or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return response
        .status(401)
        .json({ error: "Invalid admin ID or password" });
    }

    const userForToken = {
      id: user._id,
      adminId: user.adminId,
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: "1h" });

    response.status(200).send({ token, adminId: user.adminId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = AdminRouter;
