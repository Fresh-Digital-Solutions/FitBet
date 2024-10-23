const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Configure the Local Strategy for Passport
passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, // Use 'email' instead of 'username'
    async (email, password, done) => {
      try {
        // Find the user in the database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // User not found
          return done(null, false, { message: 'User not found' });
        }

        // Compare the provided password with the stored password hash
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
          // Password does not match
          return done(null, false, { message: 'Incorrect password' });
        }

        // Authentication successful, return the user
        return done(null, user);
      } catch (err) {
        // Handle any errors
        return done(err);
      }
    }
  )
);

module.exports = passport;