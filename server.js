const express = require("express");
const connectDB = require("./dbConfig/db");

// const config = require("./config/config");
const cors = require("cors");
const colors = require("colors");
const { rootRouter } = require("./routes/rootRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8100;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1", rootRouter)

// app.use("/dashboard", dashboardRoute);
// app.use("/course", courseRoute);
// app.use("/enquiry", enquiryRoute);
// app.use("/admission", admissionRoute);
// app.use("/trainer", trainerRoute);
app.listen(PORT, () => {
  console.log(`Server is runnung at PORT :${PORT}`.blue);
});
