const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new Local)

const signUp = async (req,res) => {

}