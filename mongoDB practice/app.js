const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findUserById("651d2428fb61d4ef570772ec")
//     .then(user => {
//       req.user = new User(user._id, user.name, user.email, user.cart);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://soumyadebsutradhar:r6g7wY6VjZFFMOZF@cluster0.5o05o8m.mongodb.net/?retryWrites=true&w=majority')
.then(result => {
  console.log("Conected");
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});