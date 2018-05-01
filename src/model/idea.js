// Note:
// name of idea
// subject of idea
// timestamp of creation

import mongoose from 'mongoose';

const ideaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: false,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model('idea', ideaSchema);
