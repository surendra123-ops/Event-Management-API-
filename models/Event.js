import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dateTime: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true, max: 1000 },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Event', eventSchema);
