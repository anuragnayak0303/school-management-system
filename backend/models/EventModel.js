import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  audience: String,
  title: String,
  category: String,
  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String,
  message: String,
  attachment: String,
});

export default mongoose.model('Event', eventSchema);
