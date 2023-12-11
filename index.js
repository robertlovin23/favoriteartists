const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')

const port = 5000;

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 *60 * 1000,
        keys: [keys.cookieKey]
    })
)

require('./models/user');

require('./routes/authorizationRoutes')(app)
require('./routes/userRoutes')(app)
require('./routes/recommendationRoutes')(app)

mongoose.connect(keys.mongoURI);

app.listen(port)

