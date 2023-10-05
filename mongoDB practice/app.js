const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("651e67c3767c93fd3de18998")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://soumyadebsutradhar:r6g7wY6VjZFFMOZF@cluster0.5o05o8m.mongodb.net/?retryWrites=true&w=majority')
.then(result => {
  console.log("Conected");
  User.findOne()
  .then(user => {
    if(!user) {
      const user = new User({
        name: "monu",
        email: "test@gmail.com",
        items: []
      });
      user.save()
    }
  })
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});