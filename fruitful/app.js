const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Node.js server
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static('public/images'));

// Homepage route
app.get('/', (req, res) => {
    res.header("Content-Type",'application/json');
    res.type('json').send(
        JSON.stringify(
            {"fruits": "http://localhost:3000/fruits"},
            null,
            4
        )
    );
});

// Fruit route
const fruitsRoute = require('./routes/fruit.route');
app.use('/fruits', fruitsRoute);

// Database
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => { console.log("Connected to DB"); }
    );

// Listening on
app.listen(3000);