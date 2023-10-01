require('dotenv').config();
const path = require('path');
function constructPath(...args) {
    return path.join(...args);
}
const express  = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const studentRoute = require(constructPath(__dirname, 'src', 'routes', 'studentRoute'))

mongoose.connect(process.env.DB_URL_PRODUCTION || process.env.DB_URL_DEVELOPMENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.set('views', path.join(__dirname, 'src','views'));
app.use(fileUpload());
app.set('view engine', 'ejs');
app.use(express.static(constructPath('public'))); 
app.use(express.urlencoded({ extended: true }));
app.use("/student", studentRoute)
app.listen(process.env.PORT || 4000)