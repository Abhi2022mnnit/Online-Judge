// authentication related routes eg : sign in , sendotp, signup
const express = require('express');
const router = express.Router();

// controllers

const {sendOtp,signUp,signIn} = require('../controllers/Auth');
const {problemList, addProblem, getProblemById} = require('../controllers/ProblemList');
const {runCode, submitCode} = require('../controllers/RunCode');
const {addTestCase} = require('../controllers/AddTestCases');

// middlewares
const {auth, isAdmin} = require('../middlewares/Auth');


router.post('/sendotp',sendOtp);
router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/problemList', problemList);
router.post('/addProblem', auth, isAdmin, addProblem);
router.post('/getProblemById', getProblemById);
router.post('/addTestCase', addTestCase);
router.post('/run', runCode);
router.post('/submitCode', submitCode);



module.exports = router;