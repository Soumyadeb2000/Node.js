const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
  MongoClient.connect('mongodb+srv://soumyadebsutradhar:r6g7wY6VjZFFMOZF@cluster0.5o05o8m.mongodb.net/?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected');
    _db = client.db();
    cb();
  })
  .catch(err => {
    console.log(err);
  })
}

const getDB = () => {
  if(_db) {
    return _db;
  } else {
    throw "error";
  }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
