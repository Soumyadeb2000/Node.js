const mongodb = require('mongodb');
const nodemon = require('nodemon');
const getDb = require('../util/database').getDB;

class User {
  constructor(id, name, email, cart) {
    this._id = new mongodb.ObjectId(id),
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
    const cartProductIdx = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIdx >= 0) {
      newQuantity = this.cart.items[cartProductIdx].quantity+1;
      updatedCartItems[cartProductIdx].quantity = newQuantity;
    } else {
      updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity})
    }

    const updatedCart = {items: updatedCartItems};
    const db = getDb();
    return db.collection('users')
    .updateOne({_id: new mongodb.ObjectId(this._id)},
               {$set: {cart: updatedCart}})
    .then(res => console.log(res))
    .catch(err => console.log(err))            
  }

  deleteFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() === productId.toString();
    });
    const db = getDb();
    return db.collection('users')
    .updateOne(
      {_id: new mongodb.ObjectId(this._id)},
      {$set: {cart: {items: updatedCartItems}}}
    )
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  getCart() {
    const db = getDb()
    const productIds = this.cart.items.map(i => {
      return i.productId;
    });
    return db
    .collection('products')
    .find({_id: {$in: productIds}})
    .toArray()
    .then(products => {
      return products.map(p => {
        return {...p, quantity: this.cart.items.find(i => {
          return i.productId.toString() === p._id.toString();
        }).quantity
      }
      })
    })
  }

  addOrder() {
    const db = getDb();
    return this.getCart().then(products => {
      const order = {
        items: products,
        user: {
          _id: new mongodb.ObjectId(this._id)
        }
      }
      return db.collection('orders')
      .insertOne(order)
    })
    .then(result => {
      this.cart = {items: []};
      return db.collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)},
        {$set: {cart: {items: []}}}
      )
    })
  }

  getOrder() {
    const db = getDb();
    return db.collection('orders')
    .find({'user._id': new mongodb.ObjectId(this._id)})
    .toArray();
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
