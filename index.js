const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const mongoUrl ="mongodb+srv://evspoint:donttouch1807@evspoint.sgihu.mongodb.net/evspoint";
 
const ownerToken = require("./middleware/ownerToken");

const ownerRoutes = require("./routes/ownerapi");

app.use(bodyParser.json());

app.use(ownerRoutes);
app.use(cors())
mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log("connection-successful");
  })
  .catch((err) => console.log("no connection"));

app.get("/owner", ownerToken, (req, res) => {
  res.send({
    ownerId: req.owner._id,
    firstName: req.owner.firstName,
    lastName: req.owner.lastName,
    email: req.owner.email,
    contactNo: req.owner.contactNo,
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
