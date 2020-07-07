const path = require("path");

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const userRoutes = require("./routes/user");

const adminRoutes = require("./routes/admin");

const authRoutes = require("./routes/auth");

mongoose.connect(
  'mongodb://localhost:27017/sk-fitnessclub?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  // "mongodb+srv://sumit:" + process.env.MONGO_ATLAS_PW + "@cluster0-6xhil.mongodb.net/sk-fitnessclub?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
.then( response => {
  console.log('Connected to Database!');
})
.catch( error => {
  console.log('Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join(__dirname,'images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);

module.exports = app;
