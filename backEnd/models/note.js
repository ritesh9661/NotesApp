const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema ({
  title: { 
    type: String,
    
  },
  description: {
    type: String,

  },
  
});

module.exports = mongoose.model('Note', NoteSchema);