import Event from '../models/Event.js';
import User from '../models/User.js';

// Create Event
export const createEvent = async (req, res, next) => {
  try {
    const { title, dateTime, location, capacity } = req.body;

    if (!title || !dateTime || !location || !capacity) {
      res.status(400);
      throw new Error("All fields are required");
    }

    if (capacity <= 0 || capacity > 1000) {
      res.status(400);
      throw new Error("Capacity must be between 1 and 1000");
    }

    const event = new Event({ title, dateTime, location, capacity });
    const saved = await event.save();
    res.status(201).json({ message: "Event created", eventId: saved._id });
  } catch (err) {
    next(err);
  }
};

// Get Event Details
export const getEventDetails = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('registrations');
    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

// Register User for Event
export const registerUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);
    const user = await User.findById(userId);

    if (!event || !user) {
      res.status(404);
      throw new Error("Event or User not found");
    }

    if (new Date(event.dateTime) < new Date()) {
      res.status(400);
      throw new Error("Cannot register for past events");
    }

    if (event.registrations.includes(userId)) {
      res.status(409);
      throw new Error("User already registered");
    }

    if (event.registrations.length >= event.capacity) {
      res.status(400);
      throw new Error("Event is full");
    }

    event.registrations.push(userId);
    await event.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    next(err);
  }
};

// Cancel Registration
export const cancelRegistration = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    if (!event.registrations.includes(userId)) {
      res.status(400);
      throw new Error("User was not registered");
    }

    event.registrations = event.registrations.filter(id => id.toString() !== userId);
    await event.save();

    res.status(200).json({ message: "Registration cancelled" });
  } catch (err) {
    next(err);
  }
};

// List Upcoming Events
export const listUpcomingEvents = async (req, res, next) => {
  try {
    const now = new Date();

    const events = await Event.find({
      dateTime: { $gte: now }
    }).sort({
      dateTime: 1,      
      location: 1      
    });

    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching upcoming events:", err);
    next(err); 
  }
};

// Get Event Stats



export const getEventStats = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const totalRegistrations = event.registrations.length;
    const remainingCapacity = event.capacity - totalRegistrations;
    const percentageUsed = event.capacity > 0
      ? Number(((totalRegistrations / event.capacity) * 100).toFixed(2))
      : 0;

    res.status(200).json({
      totalRegistrations,
      remainingCapacity,
      percentageUsed: `${percentageUsed}%`
    });
  } catch (err) {
    console.error("Error in getEventStats:", err);
    next(err);
  }
};

