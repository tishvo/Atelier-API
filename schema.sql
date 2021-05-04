CREATE DATABASE sdc;

USE sdc;

CREATE TABLE questions (
  id int,
  product_id int,
  body varchar(1000),
  date_written timestamp,
  asker_name varchar(200),
  asker_email varchar(200),
  reported boolean,
  helpful int
)