const mysql = require('mysql');
var Promise = require('bluebird');

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sdc'
  });

  global.db = Promise.promisifyAll(connection);

  connection.connect(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('mysql db is connected!');
    }
  });

  exports.connection = connection;

//Below are command lines to add csv data into mySQL. Keeping here just in case I need to start over 

  //LOAD DATA LOCAL INFILE '/Users/tishvo/work/sdc/questions.csv'
  //INTO TABLE questions
  //FIELDS TERMINATED BY ','
  //OPTIONALLY ENCLOSED BY '"'
  //LINES TERMINATED BY '\n'
  //(id, product_id, body, @date_written, asker_name, asker_email, reported, helpful)
  //SET date_written = FROM_UNIXTIME(@date_written * 0.001);

  //(id, question_id, body, @date_written, answerer_name, answerer_email, reported, helpful)
  //(id, answer_id, url)