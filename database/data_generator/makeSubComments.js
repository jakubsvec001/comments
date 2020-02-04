/*
This file generates a .sql file that can be directed into
mysql using the following command:
  >mysql -uroot < subCommentsGenerator.sql
*/
const fs = require('fs');
const faker = require('faker');
const path = require('path');
const dateFormat = require('date-format');
const {
  subCommentTotal,
  commentTotal,
  userTotal,
  DB_USER,
  DB_HOST,
  DB_PASS,
  DB_NAME,
} = require('./constants');

// create string to append onto
let data = `
create database if not exists bobo_beats;

use bobo_beats;

drop table if exists sub_comments;

create table sub_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  parent_comment_id INT NOT NULL,
  post_date DATETIME,
  comment varchar(512)
);

INSERT INTO sub_comments 
(user_id, parent_comment_id, post_date, comment) VALUES
`;

const makeDate = () => {
  const date = faker.date.between('2019-01-01', '2020-03-03');
  return dateFormat('yyy-MM-dd hh:mm:ss', date);
};

let subCommentCount = subCommentTotal;

const generateSubComment = () => {
  const userId = Math.floor(Math.random() * userTotal);
  const parentCommentId = Math.floor(Math.random() * commentTotal);
  const date = makeDate();
  const comment = faker.lorem.paragraph();
  return `(${userId}, ${parentCommentId}, '${date}', '${comment}')`;
};

// iteratively add to 'data' string
while (subCommentCount > 1) {
  data += `${generateSubComment()},\n`;
  subCommentCount -= 1;
}
// add the final string with a semi-colon at the end
data += `${generateSubComment()};`;

// async write to file
fs.writeFile(
  path.resolve(__dirname, 'subCommentsGenerator.sql'),
  data,
  'utf8',
  (err) => {
    if (err) console.log(err);
    else {
      console.log(
        `SUCCESS! Generated: ${subCommentTotal} random subComments by ${userTotal} users for ${commentTotal} main comments`,
      );
    }
  },
);
