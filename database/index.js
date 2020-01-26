const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/boboBeats';


mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

const UserModel = new Schema({

})

const commentModel = new Schema({
  songId: int,
  userId: hex,
  trackStamp: mm:ss,
  dateTime: dateTime,
  comment: Text,
  subcomments: list of comments
})
