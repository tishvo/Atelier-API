const express = require('express');
const bp = require("body-parser");
var Promise = require('bluebird');
const port = 5000;
const connection = require('./mysql.js');
const { resolve } = require('bluebird');

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));


app.get("/qa/questions", (req, res) => {
  var product_id = req.query['product_id'];
  var query = `SELECT * FROM questions WHERE product_id=${product_id} AND reported=0;`

  db.queryAsync(query) 
  .then(async function _(questions) {
    for (var i = 0; i < questions.length; i++) {
      const currentQ = questions[i];
      var q_id = currentQ['id'];
      var a_query = `SELECT * FROM answers WHERE question_id=${q_id} AND reported=0;`
      currentQ.answers = await db.queryAsync(a_query);
    }
    res.send(questions);
  })
  .catch(err => {
    res.send('error retrieving data');
  })
});

app.listen(port, () => {
  console.log("Express server is listening on port " + port);
});





