const express = require("express");
const connectDB = require("./dbConfig/db");
const bodyParser = require("body-parser");
const enquiryRoute = require("./EnquiryFolder/enquiryRoute.js");
const admissionRoute = require("./AdmissionFolder/admissionRoute.js");
const trainerRoute = require("./TrainerFolder/trainerRoute.js");
const dashboardRoute = require("./DashboardFolder/dashboardRoute.js");
const courseRoute = require("./Course/routes.js");
const config = require("./config/config");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8100;
connectDB();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/dashboard", dashboardRoute);
app.use("/course", courseRoute);
app.use("/enquiry", enquiryRoute);
app.use("/admission", admissionRoute);
app.use("/trainer", trainerRoute);
app.listen(PORT, () => {
  console.log(`Server is runnung at PORT :${PORT}`.blue);
});
