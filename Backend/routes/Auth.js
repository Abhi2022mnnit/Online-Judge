// authentication related routes eg : sign in , sendotp, signup
const express = require('express');
const router = express.Router();

// controllers

const {sendOtp,signUp,signIn} = require('../controllers/Auth');
const {problemList, addProblem} = require('../controllers/ProblemList');

router.post('/sendotp',sendOtp);
router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/problemList', problemList);
router.post('addProblem', addProblem);



module.exports = router;