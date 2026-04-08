const express = require('express');
const { registerForEvent, getUserRegistrations } = require('../controllers/registrationController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', auth, registerForEvent);
router.get('/my-registrations', auth, getUserRegistrations);

module.exports = router;
