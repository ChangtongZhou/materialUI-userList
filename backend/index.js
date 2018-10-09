const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

// Import routes from the user
const user = require('./routes/user.route');

//set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = 'mongodb://localhost:localhost12345@ds133202.mlab.com:33202/userlist_app_db'
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', ()=>{
    console.log('mongodb connected successfully.');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', user);
// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Userlist app listening on port ${PORT}`));