const express = require('express');
const bp = require("body-parser");
const port = 5000;
const connection = require('./mysql.js');

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

app.get("/", (req, res) => {
  res.send("i am a server response!");
  // connection.connection.query('SELECT * FROM questions WHERE product_id=1', function(error, results, fields) {
  //   if (error) {
  //     console.log(error);
  //   }
  //   console.log('the query results are: ', results);
  // })
});

app.listen(port, () => {
  console.log("Express server is listening on port " + port);
});
