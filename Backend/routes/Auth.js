// authentication related routes eg : sign in , sendotp, signup
const express = require('express');
const router = express.Router();

// controllers
const {sendOtp,signUp,signIn} = require('../controllers/Auth');

router.post('/sendotp',sendOtp);
router.post('/signup',signUp);
router.post('/signin',signIn);
module.exports = router;