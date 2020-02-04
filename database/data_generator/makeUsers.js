// https://www.npmjs.com/package/faker
// http://faker.hook.io/?property=image.avatar
const fs = require('fs');
const faker = require('faker');
const path = require('path');
const { 
  userTotal,
  DB_USER,
  DB_HOST,
  DB_PASS,
  DB_NAME,
} = require('./constants');

// id
// Int pk auto incrementing
// username varchar(64)
// imageUrl varchar(128)
// followers Int
// location ]]varchar(64)

let data = `
create database if not exists bobo_beats;

use bobo_beats;

drop table if exists users;

create table users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL,
  avatar_url VARCHAR(128) NOT NULL,
  follower_count INT
);

INSERT INTO users 
  (username, avatar_url, follower_count) VALUES
`;

let userCount = userTotal;

const generateUser = () => {
  return `("${faker.name.firstName()} ${faker.name.lastName()}", "${faker.image.avatar()}", ${Math.floor(
    Math.random() * 100,
  )})`;
};

while (userCount > 1) {
  data += `${generateUser()},\n`;
  userCount -= 1;
}

data += `${generateUser()};`;

fs.writeFile(
  path.resolve(__dirname, 'usersGenerator.sql'),
  data,
  'utf8',
  (err) => {
    if (err) console.log(err);
    else {
      console.log(`SUCCESS! Generated: ${userTotal} random users`);
    }
  },
);
