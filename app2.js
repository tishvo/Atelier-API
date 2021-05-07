const express = require('express');
const bp = require("body-parser");
const db = require('./mongoose.js');
const port = 8000;

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

app.get("/", (req, res) => {
    res.send("i am another server response!");
  });
  
  app.listen(port, () => {
    console.log("Express server is listening on port " + port);
  });