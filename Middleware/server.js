const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

app.use("/api/auth", require("../mini_uber_backend_project/Middleware/Models/routes/authRoutes"));
app.use("/api/rides", require("../mini_uber_backend_project/Middleware/Models/routes/rideRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});