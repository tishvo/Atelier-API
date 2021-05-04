const mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'sdc'
});

connection.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log('Database is connected!');
  }
});

exports.connection = connection;