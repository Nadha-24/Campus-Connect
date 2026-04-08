const { Registration, Event, Club, User } = require('../models');

// Register for an event
const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    // Check if event exists
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event is full
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      where: { userId, eventId }
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Create registration
    const registration = await Registration.create({
      userId,
      eventId
    });

    // Update event participant count
    await Event.update(
      { currentParticipants: event.currentParticipants + 1 },
      { where: { id: eventId } }
    );

    res.status(201).json({
      success: true,
      message: 'Successfully registered for event',
      registration
    });
  } catch (error) {
    console.error('Register for event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's registrations
const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;

    const registrations = await Registration.findAll({
      where: { userId },
      include: [
        {
          model: Event,
          include: [
            {
              model: Club,
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [[{ model: Event }, 'date', 'DESC']]
    });

    res.json({
      success: true,
      registrations
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerForEvent,
  getUserRegistrations
};
