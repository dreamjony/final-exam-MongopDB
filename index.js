const express = require('express');
const app = express();
const port = 4000;

// Cors
const cors = require('cors');
app.use(cors());

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
const mongoose = require('mongoose');
//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/express-mongodb',);

// Schema
const Schema = mongoose.Schema;

// Create Schema
const studentSchema = new Schema({
  name: String,
  age: Number,
  email: String,
  address: String,
  phone: Number,
  skills: Array,
});

// Create Model
const studentModel = mongoose.model('Student', studentSchema);


// Create Student
app.post('/create-student', (req, res) => {
    const student = new studentModel(req.body);
    student.save().then((student) => {
      res.send('Student Created');
    }).catch((err) => {
      res.status(400).send('Unable to save data');
    });
});

// Get All Students
app.get('/get-student', (req, res) => {
    studentModel.find().then((students) => {
      res.json(students);
    }).catch((err) => {
      res.status(400).send('Unable to find student data');
    });
  });

// Get Student By ID
app.get('/get-student/:id', (req, res) => {
    studentModel.findById(req.params.id).then((student) => {
      res.send(student);
    }).catch((err) => {
      res.status(400).send('Unable to find student data');
    });
  });

  // Update Student By ID
app.put('/update-student/:id', (req, res) => {
    studentModel.findByIdAndUpdate
    (req.params.id, req.body).then((student) => {
      res.send('Student Information Updated Successfully');
    }).catch((err) => {
      res.status(400).send('Unable to update student data');
    });
 });

 // Delete Student By ID
app.delete('/delete-student/:id', (req, res) => {
    studentModel.findByIdAndDelete(req.params.id).then((student) => {
      res.send('Student Information Deleted Successfully');
    }).catch((err) => {
      res.status(400).send('Unable to delete student data');
    });
  });




// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the home page');
  });

// Create Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


