const mongoose = require('mongoose');

const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Note', NoteSchema);
