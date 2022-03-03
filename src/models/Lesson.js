const mongoose = require('mongoose');
const { Schema } = mongoose;

const LessonSchema = new Schema({
    level_id: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    bibliography: { type: Array },
    img: { type: String },
    pdfurl: { type: String },
    date: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = mongoose.model('Lesson', LessonSchema);