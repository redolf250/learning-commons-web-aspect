const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
});

const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    height: String,
    image: imageSchema
});


module.exports = mongoose.model('Student', studentSchema);