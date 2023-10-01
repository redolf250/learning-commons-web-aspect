const express  = require('express');
const Student  = require('../model/Student');

const student = express.Router()

student.get('/',async (req, res) => {
    res.render('index', { title: 'My Express App' });
    
})

student.get('/register',async (req, res) => {
    res.json({"success": "Student"})
})

module.exports = student

