/*
This file generates a .sql file that can be directed into
mysql using the following command:
  >mysql -uroot < commentsGenerator.sql
*/
const fs = require('fs');
const faker = require('faker');
const path = require('path');
const dateFormat = require('date-format');
const {
  commentTotal,
  userTotal,
  songTotal,
  DB_USER,
  DB_HOST,
  DB_PASS,
  DB_NAME,
} = require('./constants');

let data = `
create database if not exists bobo_beats;

use bobo_beats;

drop table if exists comments;

create table comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  song_id INT NOT NULL,
  user_id INT NOT NULL,
  track_time varchar(8),
  post_date DATETIME,
  comment varchar(512)
);

INSERT INTO comments 
  (song_id, user_id, track_time, post_date, comment) VALUES
`;

const makeDate = () => {
  const date = faker.date.between('2019-01-01', '2020-03-03');
  return dateFormat('yyy-MM-dd hh:mm:ss', date);
};

let commentCount = commentTotal;
let trackMinute;
let trackSecond;
let trackTime;
let songId;
let userId;
let date;
let comment;

const generateComment = () => {
  trackMinute = Math.floor(Math.random() * 4).toString();
  trackSecond = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, '0');
  trackTime = `${trackMinute}:${trackSecond}`;
  songId = Math.floor(Math.random() * 100);
  userId = Math.floor(Math.random() * 100);
  date = makeDate();
  comment = faker.lorem.paragraph();
  return `('${songId}', '${userId}', '${trackTime}', '${date}', '${comment}')`;
};

while (commentCount > 1) {
  data += `${generateComment()},\n`;
  commentCount -= 1;
}

data += `${generateComment()};`;

fs.writeFile(
  path.resolve(__dirname, 'commentsGenerator.sql'),
  data,
  'utf8',
  (err) => {
    if (err) console.log(err);
    else {
      console.log(`SUCCESS! Generated: generating ${commentTotal} random comments by ${userTotal} users for ${songTotal} songs`);
    }
  },
);
