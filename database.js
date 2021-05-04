const mysql = require('mysql');

  var connection = mysql.createConnection({
    user: 'student',
    password: 'student',
    database: 'sdc'
  });

  connection.connect(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Database is connected!');
    }
  });

  exports.connection = connection;


  //LOAD DATA LOCAL INFILE '/Users/tishvo/work/sdc/questions.csv'
  //INTO TABLE questions
  //FIELDS TERMINATED BY ','
  //OPTIONALLY ENCLOSED BY '"'
  //LINES TERMINATED BY '\n'
  //(id, product_id, body, @date_written, asker_name, asker_email, reported, helpful)
  //SET date_written = FROM_UNIXTIME(@date_written * 0.001);