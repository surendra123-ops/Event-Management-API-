import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true , unique: true },
  dateTime: { type: Date, required: true, default: Date.now },
  location: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Event', eventSchema);
