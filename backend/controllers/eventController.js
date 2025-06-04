import fs from 'fs';
import path from 'path';
import EventModel from '../models/EventModel.js';
 // replace with actual model path

export const addEvent = async (req, res) => {
  try {
    const {
      audience,
      title,
      category,
      startDate,
      endDate,
      startTime,
      endTime,
      message,
    } = req.body;

    const attachment = req.file?.filename || null;

    const event = new EventModel({
      audience,
      title,
      category,
      startDate,
      endDate,
      startTime,
      endTime,
      message,
      attachment,
    });

    await event.save();

    res.status(201).json({ success: true, message: 'Event created successfully', event });
  } catch (err) {
    console.error("Error adding event:", err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
