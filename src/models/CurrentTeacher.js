const mongoose = require('mongoose');
const { Schema } = mongoose;
const Moment = require('moment');

const CurrentTeacherSchema = new Schema({
    member_id: {
        type: String,
    },
    level_id: { type: String },
    status: { type: Boolean },
    start: { type: Date },
    end: { type: Date },
    observations: { type: String },
    date: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = mongoose.model('CurrentTeacher', CurrentTeacherSchema);