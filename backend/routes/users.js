const express = require('express');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();



router.get('/getUser/:id', getUser)
router.post('/updateUser/:id', updateUser)
router.post('/deleteUser/:id', deleteUser)

module.exports = router;