# FitBet
This is an accountability-focused workout app where users can add friends, set weekly workout goals, and place bets on their success. Users who meet their goals get to keep their money, but if they miss a workout, a portion of the bet goes to their friend based on the missed days. The app uses an Expo front-end for a seamless mobile experience and an Express backend with PostgreSQL for data storage and Prisma ORM for database management.

### Features
- User Authentication: Secure user registration and login.
- Friendship System: Users can add friends and challenge each other with bets on workout goals.
- Goal Tracking: Set weekly workout goals, track workouts, and verify progress.
- Betting System: Place bets with friends and settle based on goal completion.
- Transactions: Automatically manage money transfers between users when goals are not met.

### Tech Stack
Frontend: Expo Router for mobile navigation and user interfaces.
Backend: Express.js for handling API requests.
Database: PostgreSQL for structured data storage, managed via Prisma ORM.
Containerization: Docker for setting up and managing the environment.
Authentication: Firebase Auth

### Setup Instructions
Prerequisites
- Node.js: Ensure you have Node.js installed (preferably the latest LTS version).
- Docker: Install Docker to containerize and run your app.
- Expo CLI: Install Expo CLI for running the frontend

```
├── mobile/                     # Expo mobile app
│   ├── screens/             # UI screens (e.g., Login, Signup, Goals, Friends)
│   └── navigation/          # Expo Router for navigation
├── backend/                 # Express.js backend
│   ├── prisma/              # Prisma schema and migrations
│   ├── controllers/         # API controllers for user, workout, bet logic
│   ├── routes/              # API routes
│   └── index.js             # Express server entry point
├── docker-compose.yml       # Docker setup for backend and database
├── package.json             # Root-level package.json to manage project dependencies
└── README.md                # Project overview and setup instructions
```
### Get Started
1. Get the local database and server started
```bash
docker-compose up --build -d 
```
2. Prisma migration (This command must be ran when making changes to the schema. This will apply to our local database)
```bash
docker exec -it fitbet-backend npx prisma migrate dev
```
3. Setup Mobile
```bash
cd mobile

npm install

npx expo start 
```
4. We are using Expo so download the app and it will show up there. 
