# Campus Connect - Full-Stack Application

A complete full-stack web application for Crescent University students to discover clubs, register for events, and manage their campus activities.

## 🏗️ Tech Stack

### Frontend
- **React 18** with hooks
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **JWT** for authentication

### Backend
- **Node.js** with Express
- **MySQL** database
- **Sequelize ORM**
- **JWT** for authentication
- **bcryptjs** for password hashing

## 📋 Features

- **User Authentication**: Secure registration and login with JWT
- **Club Discovery**: Browse and filter student clubs by category
- **Event Management**: View upcoming and recent events for each club
- **Event Registration**: Register for events with real-time participant tracking
- **Registration Dashboard**: View all registered events (upcoming and completed)
- **Student Profile**: Personal profile with notifications and to-do list
- **Responsive Design**: Mobile-friendly interface

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MySQL database
- npm or yarn

### Database Setup

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE campus_connect;
   ```

2. **Update Environment Variables**
   - Open `server/.env`
   - Update your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=campus_connect
   JWT_SECRET=your_jwt_secret_key_here
   ```

### Installation & Setup

1. **Install Frontend Dependencies**
   ```bash
   cd d:\websiteprojects
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   - Server will run on `http://localhost:5000`
   - Database will be automatically seeded with initial data

4. **Start the Frontend Application**
   ```bash
   cd d:\websiteprojects
   npm start
   ```
   - Application will run on `http://localhost:3000`

## 📁 Project Structure

```
d:\websiteprojects/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── contexts/          # React contexts (Auth)
│   │   ├── services/          # API services
│   │   └── App.js             # Main app component
│   ├── public/
│   └── package.json
├── server/                    # Backend Node.js application
│   ├── config/               # Database configuration
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Authentication middleware
│   ├── models/               # Sequelize models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   ├── server.js             # Main server file
│   └── package.json
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Clubs
- `GET /api/clubs` - Get all clubs
- `GET /api/clubs/:id` - Get club details with events

### Registrations
- `POST /api/registrations/register` - Register for event
- `GET /api/registrations/my-registrations` - Get user registrations

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `name` (String)
- `email` (Unique)
- `password` (Hashed)
- `studentId` (Unique)
- `major` (String)
- `year` (String)

### Clubs Table
- `id` (Primary Key)
- `name` (String)
- `description` (Text)
- `category` (String)
- `members` (Integer)
- `image` (String)
- `color` (String)

### Events Table
- `id` (Primary Key)
- `clubId` (Foreign Key)
- `title` (String)
- `description` (Text)
- `date` (Date)
- `time` (String)
- `location` (String)
- `type` (Enum: 'upcoming', 'recent')
- `maxParticipants` (Integer)
- `currentParticipants` (Integer)
- `image` (String)

### Registrations Table
- `id` (Primary Key)
- `userId` (Foreign Key)
- `eventId` (Foreign Key)
- `registeredAt` (Timestamp)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Login/Registration**: User receives a JWT token
2. **Token Storage**: Token is stored in localStorage
3. **API Requests**: Token is automatically included in request headers
4. **Protected Routes**: Backend validates token for protected endpoints

## 🎨 Design Features

- **Modern UI**: Clean, card-based layout with shadows and hover effects
- **Bold Colors**: Blue and purple accent colors with proper contrast
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Design**: Mobile-first approach with breakpoints
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: User-friendly error messages

## 🛠️ Development

### Frontend Development
```bash
cd d:\websiteprojects
npm start
```

### Backend Development
```bash
cd server
npm run dev
```

### Database Reset
To reset the database and reseed with initial data:
1. Stop the server
2. Delete all tables from the database
3. Restart the server (it will automatically recreate and seed)

## 📝 Notes

- The backend automatically seeds the database with 6 clubs and sample events on first run
- All passwords are securely hashed using bcryptjs
- JWT tokens expire after 7 days (configurable)
- The application uses environment variables for sensitive configuration
- CORS is enabled for development (configure for production)

## 🚀 Deployment

For production deployment:

1. **Environment Variables**: Set production values in `.env`
2. **Database**: Use production MySQL database
3. **Build Frontend**: `npm run build`
4. **Start Server**: `npm start` (production mode)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
