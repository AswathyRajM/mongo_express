const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// marks model with reference to student schema
let Marks = new Schema({
    studentId: { type: String, required: true },
    marks: Number,
    subject: String,
    studentObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }
},{ versionKey: false });

// Export the model
module.exports = mongoose.model('Marks', Marks);