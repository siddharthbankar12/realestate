const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRouter = require("./controllers/newuser");
const loginRouter = require("./controllers/login");
const AdminRouter = require("./controllers/adminlogin");
const adminsignuprouter = require("./controllers/adminsignup");

const mongoDB = require("./db");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 8000; // Keeping some default port, if there is no port number on env file

mongoDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/users", loginRouter);
app.use("/api/admin/login", AdminRouter);
app.use("/api/admin", adminsignuprouter);
app.use("/api", require("./controllers/propertyRoutes"));
app.use("/api", require("./controllers/propertyImageRoutes"));
app.use("/api/testimonials", require("./controllers/testimonialRoutes"));
app.use("/api", require("./controllers/emailVerification"));
app.use("/api", require("./controllers/Appointment"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
