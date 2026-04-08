const { Club, Event } = require('../models');

// Get all clubs
const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll({
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      clubs
    });
  } catch (error) {
    console.error('Get clubs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get club by ID with events
const getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.findByPk(id, {
      include: [
        {
          model: Event,
          order: [['date', 'DESC']]
        }
      ]
    });

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.json({
      success: true,
      club
    });
  } catch (error) {
    console.error('Get club error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllClubs,
  getClubById
};
