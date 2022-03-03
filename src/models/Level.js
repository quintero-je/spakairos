const mongoose = require('mongoose');
const { Schema } = mongoose;

const LevelSchema = new Schema({
    title: { type: String },
    description: { type: String },
    period: { type: String },
    lessons: { type: Number },
    pdfurl: { type: String },
    status: { type: Boolean },
    img: { type: String },
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
});

module.exports = mongoose.model('Level', LevelSchema);