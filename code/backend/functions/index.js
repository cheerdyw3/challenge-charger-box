const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:true}));

const users = require('./modules/users.module');
const lockers = require('./modules/lockers.module');
const bookings = require('./modules/bookings.module');

users.initialize(app);
lockers.initialize(app);
bookings.initialize(app);

//routes
app.get('/hello',(req,res)=>{
    return res.status(200).send('hello');
});

exports.app = functions.https.onRequest(app);