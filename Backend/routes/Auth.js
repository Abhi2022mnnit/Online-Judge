// authentication related routes eg : sign in , sendotp, signup
const express = require('express');
const router = express.Router();

// controllers

const {sendOtp,signUp,signIn} = require('../controllers/Auth');
const {problemList, addProblem, getProblemById} = require('../controllers/ProblemList');
const {runCode} = require('../controllers/RunCode');


router.post('/sendotp',sendOtp);
router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/problemList', problemList);
router.post('/addProblem', addProblem);
router.post('/getProblemById', getProblemById);
router.post('/run', runCode);



module.exports = router;