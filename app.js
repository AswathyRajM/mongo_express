const express = require('express');
const bodyParser = require('body-parser');
const student = require('./routes/student.route');

const app = express();

// db connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/students', { useCreateIndex: true ,useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/student', student);

let port = 4444;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});