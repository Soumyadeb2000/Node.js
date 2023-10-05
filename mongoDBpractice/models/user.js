const mongodb = require('mongodb');
const getDb = require('../util/database').getDB;

class User {
  constructor(id, name, email, cart) {
    this._id = id,
    this.name = name,
    this.email = email
    this.cart = cart
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

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp.id===product._id
    // });
    const updatedCart = {items: [{...product, quantity: 1}]};
    const db = getDb();
    return db.collection('users')
    .updatedOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart} })
    .then(res => console.log(res))
    .catch(err => console.log(err));
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
