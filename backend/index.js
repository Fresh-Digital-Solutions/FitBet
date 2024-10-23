const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const passport = require('./passportConfig');
app.use(express.json());
app.use(cors());

app.use(passport.initialize());

app.use('/v1/auth', authRoutes);

const PORT = process.env.port || 4000;


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
