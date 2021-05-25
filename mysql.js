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

