CREATE DATABASE IF NOT EXISTS sdc;

USE sdc;

CREATE TABLE IF NOT EXISTS questions (
  id int AUTO_INCREMENT,
  product_id int,
  body varchar(1000),
  date_written datetime(3),
  asker_name varchar(200),
  asker_email varchar(200),
  reported tinyint(1),
  helpful int,
  PRIMARY KEY (id)
)

-- CREATE TABLE IF NOT EXISTS answers (
--   id int AUTO_INCREMENT,
--   question_id int,
--   body varchar(800),
--   date_written datetime(3),
--   answerer_name varchar(200),
--   answerer_email varchar(200),
--   reported tinyint(1),
--   helpful int,
--   PRIMARY KEY (id)
-- )

-- CREATE TABLE IF NOT EXISTS answer_photos (
--   id int AUTO_INCREMENT,
--   answer_id int,
--   url varchar(500),
--   PRIMARY KEY (id)
-- )


