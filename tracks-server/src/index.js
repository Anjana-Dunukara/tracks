require("./models/User");
require("./models/Track");
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://admin:4koiHuOBEEO7fEDH@cluster0.5dh3jqc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo instance", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your Email is ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listning on port 3000..");
});
