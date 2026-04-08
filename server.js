const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

// Import routes
const authRoutes = require('./routes/auth');
const clubRoutes = require('./routes/clubs');
const registrationRoutes = require('./routes/registrations');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/registrations', registrationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: false });
    console.log('Database synced successfully');

    // Seed initial data
    await seedData();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Seed initial data
const seedData = async () => {
  const { Club, Event } = require('./models');
  
  try {
    // Check if clubs already exist
    const clubCount = await Club.count();
    if (clubCount > 0) return;

    // Create clubs
    const clubs = await Club.bulkCreate([
      {
        name: 'Computer Science Club',
        description: 'For students passionate about coding, algorithms, and technology innovation.',
        category: 'Academic',
        members: 45,
        image: 'https://picsum.photos/seed/cs-club/400/300.jpg',
        color: 'blue'
      },
      {
        name: 'Drama Society',
        description: 'Express yourself through theater, improv, and performing arts.',
        category: 'Arts',
        members: 32,
        image: 'https://picsum.photos/seed/drama/400/300.jpg',
        color: 'purple'
      },
      {
        name: 'Basketball Team',
        description: 'Join us for competitive basketball and fitness training.',
        category: 'Sports',
        members: 18,
        image: 'https://picsum.photos/seed/basketball/400/300.jpg',
        color: 'orange'
      },
      {
        name: 'Photography Club',
        description: 'Capture moments and learn photography techniques.',
        category: 'Arts',
        members: 28,
        image: 'https://picsum.photos/seed/photo/400/300.jpg',
        color: 'green'
      },
      {
        name: 'Debate Club',
        description: 'Hone your public speaking and critical thinking skills.',
        category: 'Academic',
        members: 22,
        image: 'https://picsum.photos/seed/debate/400/300.jpg',
        color: 'red'
      },
      {
        name: 'Music Society',
        description: 'For musicians and music lovers to collaborate and perform.',
        category: 'Arts',
        members: 35,
        image: 'https://picsum.photos/seed/music/400/300.jpg',
        color: 'indigo'
      }
    ]);

    // Create events
    const events = [];
    const currentDate = new Date();
    
    clubs.forEach((club, index) => {
      const upcomingDate = new Date(currentDate);
      upcomingDate.setDate(currentDate.getDate() + (index + 1) * 7);
      
      const recentDate = new Date(currentDate);
      recentDate.setDate(currentDate.getDate() - (index + 1) * 5);

      events.push({
        clubId: club.id,
        title: `${club.name} Workshop`,
        description: `Join us for an exciting workshop organized by ${club.name}`,
        date: upcomingDate.toISOString().split('T')[0],
        time: '02:00 PM',
        location: 'Main Campus',
        type: 'upcoming',
        maxParticipants: 30,
        currentParticipants: 0,
        image: club.image
      });

      events.push({
        clubId: club.id,
        title: `${club.name} Meeting`,
        description: `Regular meeting for ${club.name} members`,
        date: recentDate.toISOString().split('T')[0],
        time: '03:00 PM',
        location: 'Club Room',
        type: 'recent',
        maxParticipants: 25,
        currentParticipants: 25,
        image: club.image
      });
    });

    await Event.bulkCreate(events);
    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

startServer();
