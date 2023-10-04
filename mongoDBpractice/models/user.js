const mongodb = require('mongodb');
const getDb = require('../util/database').getDB;

class User {
  constructor(id, name, email) {
    this._id = new mongodb.ObjectId(id),
    this.name = name,
    this.email = email
  }

  save() {
    const db = getDb();
    db.collection('users')
    .insertOne(this)
    .then((res) => {
      console.log("user saved");
      console.log(this);
    })
    .catch(err => console.log(err))
  }

  static findUserById(userId) {
    const db = getDb();
    return db.collection('users')
    .findOne({_id: new mongodb.ObjectId(userId)})
    .then((user) => {
      return user;
    })
    .catch(err => console.log(err))
  }
}

module.exports = User;
