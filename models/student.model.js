const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// student model 
let Student = new Schema({
    studentId: { type: String, required: true, unique: true },
    name: String,
    phoneNumber: Number,
    age: { type: Number, required: true },
}, { versionKey: false });

// Export the model
module.exports = mongoose.model('Student', Student);