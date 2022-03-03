const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors())
const port = process.env.PORT || 3000;
const mongoUrl ="mongodb+srv://evspoint:donttouch1807@evspoint.sgihu.mongodb.net/evspoint";
 
const ownerToken = require("./middleware/ownerToken");

const ownerRoutes = require("./routes/ownerapi");

app.use(bodyParser.json());

app.use(ownerRoutes);
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept")

  next();
})
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
