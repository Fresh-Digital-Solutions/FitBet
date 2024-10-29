const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const friendsRoutes = require('./routes/friends');
const passport = require('./passportConfig');
app.use(express.json());
app.use(cors());

app.use(passport.initialize());

app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/friends', friendsRoutes);

const PORT = process.env.port || 4000;


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
