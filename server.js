const express = require("express");
const connectDB = require("./dbConfig/db");
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
app.listen(PORT, () => {
  console.log(`Server is runnung at PORT :${PORT}`.blue);
});
