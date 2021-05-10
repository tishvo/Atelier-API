const express = require('express');
const bp = require("body-parser");
var Promise = require('bluebird');
const port = process.env.PORT || 5000;
const connection = require('./mysql.js');
const { resolve } = require('bluebird');
const moment = require('moment');

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(express.json());
app.use(bp.json());
app.use(require("morgan")("dev"));

//gets all the questions for a given product_id
app.get("/qa/questions", (req, res) => {
  var product_id = req.query['product_id'];
  var query = `SELECT * FROM questions WHERE product_id=${product_id} AND reported=0 LIMIT 5;`;

  db.queryAsync(query) 
  .then(async function _(questions) {
    for (var i = 0; i < questions.length; i++) {
      const currentQ = questions[i];
      var q_id = currentQ['id'];
      var a_query = `SELECT * FROM answers WHERE question_id=${q_id} AND reported=0;`;
      currentQ.answers = await db.queryAsync(a_query);
    }
    res.status(200).send({
      product_id: product_id,
      results: questions
    });
  })
  .catch(err => {
    res.status(500).send('error retrieving data');
  })
});

//gets all the answers for a given question_id
app.get("/qa/questions/:question_id/answers", (req, res) => {
  var question_id = req.params.question_id;
  var query = `SELECT * FROM answers WHERE question_id=${question_id} AND reported=0 LIMIT 5;`;
  db.queryAsync(query)
  .then(async function _(answers) {
    for (var i = 0; i < answers.length; i++) {
      const currentA = answers[i];
      var a_id = currentA['id'];
      var photo_query = `SELECT * FROM answer_photos WHERE answer_id=${a_id};`;
      currentA.photos = await db.queryAsync(photo_query);
    }
    res.status(200).send({
      question: question_id,
      page: 0,
      count: answers.length,
      results: answers
    })
  })
  .catch(err => {
    res.status(500).send('error retrieving data');
  })
});


//adds a question
app.post("/qa/questions", (req, res) => {
 
 var body = req.body.body;
 var name = req.body.name;
 var email = req.body.email;
 var prod_id = req.body.product_id;
 var date = new Date().toISOString().slice(0, 19).replace('T', ' ');

var query = `INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ('${prod_id}', '${body}', '${date}', '${name}', '${email}', '0', '0');`;
db.queryAsync(query)
.then(() => {
  res.status(201).send();
})
.catch(err => {
  res.status(500).send();
  console.log(err);
})
});


//adds an answer
app.post("/qa/questions/:question_id/answers", (req, res) => {
  var q_id = req.params.question_id;
  var body = req.body.body;
  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var name = req.body.name;
  var email = req.body.email;

  var query = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ('${q_id}', '${body}', '${date}', '${name}', '${email}', '0', '0');`;
  db.queryAsync(query)
  .then(() => {
  res.status(201).send();
})
  .catch(err => {
  res.status(500).send();
  console.log(err);
})
 });


 //marks a question as helpful
 app.put("/qa/questions/:question_id/helpful", (req, res) => {
  var q_id = req.params.question_id;

  var query = `UPDATE questions SET helpful = helpful + 1 WHERE id = ${q_id};`;
  db.queryAsync(query)
  .then(() => {
  res.sendStatus(204);
})
  .catch(err => {
  res.sendStatus(500);
  console.log(err);
})
 });


 //reports a question
 app.put("/qa/questions/:question_id/report", (req, res) => {
  var q_id = req.params.question_id;

  var query = `UPDATE questions SET reported = 1 WHERE id = ${q_id};`;
  db.queryAsync(query)
  .then(() => {
  res.sendStatus(204);
})
  .catch(err => {
  res.sendStatus(500);
  console.log(err);
})

 });


 //marks an answer as helpful
 app.put("/qa/answers/:answer_id/helpful", (req, res) => {
  var a_id = req.params.answer_id;

  var query = `UPDATE answers SET helpful = helpful + 1 WHERE id = ${a_id};`;
  db.queryAsync(query)
  .then(() => {
  res.sendStatus(204);
})
  .catch(err => {
  res.sendStatus(500);
  console.log(err);
})
 });


 //reports an answer
 app.put("/qa/answers/:answer_id/report", (req, res) => {
  var a_id = req.params.answer_id;

  var query = `UPDATE answers SET reported = 1 WHERE id = ${a_id};`;
  db.queryAsync(query)
  .then(() => {
  res.sendStatus(204);
})
  .catch(err => {
  res.sendStatus(500);
  console.log(err);
})
 });





app.listen(port, () => {
  console.log("Express server is listening on port " + port);
});


