const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminRouter = require("express").Router();
const Admin = require("../models/Admin");

const SECRET = "bearer"; // This should be in the dotenv file, rn I am keeping it here.

AdminRouter.post("/", async (request, response) => {
  try {
    const { adminId, password } = request.body;

    var user = await Admin.findOne({ adminId });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (user == null) {
      user = await Admin.findOne({ password: passwordCorrect });
    }

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "Invalid id or password",
      });
    }

    const userForToken = {
      id: user._id,
      adminId: user.adminId,
    };

    const token = jwt.sign(userForToken, SECRET);

    response.status(200).send({ token, adminId: user.adminId });
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = AdminRouter;
