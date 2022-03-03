const mongoose = require('mongoose');
const { Schema } = mongoose;

const EnrollmentSchema = new Schema({
    member_id: { type: String },
    level_id: { type: String },
    status: { type: String },
    date: { type: Date, default: Date.now },
    type: { type: String },

});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);