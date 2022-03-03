const mongoose = require('mongoose');
const { Schema } = mongoose;
const Moment = require('moment');

const AttendanceSchema = new Schema({
    member_id: {
        type: String,
    },
    lesson_id: { type: String },
    level_id: { type: String },

    status: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);