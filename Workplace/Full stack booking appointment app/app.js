const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const userRoute = require('./routes/userRoute')

const User = require('./models/User');
const sequelize = require('./utils/database');

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.use('/user', userRoute);

sequelize.sync()
.then(res => {
    console.log(res);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})
