const express = require('express');
const bp = require("body-parser");
const port = 5000;
const connection = require('./database.js');

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

app.get("/", (req, res) => {
  res.send("i am a server response!");
});

app.listen(port, () => {
  console.log("Express server is listening on port " + port);
});
