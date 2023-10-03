const express = require('express');

const Product = require('./models/product');

const router = require('./router/admin')

const sequelize = require('./utils/database')

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({extended: false}));

app.use(cors());

app.use(router);

sequelize.sync()
.then(() => {
    console.log('server running on 3000');
    app.listen(3000);
})
.catch(err => console.log(err));