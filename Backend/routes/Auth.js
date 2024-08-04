// authentication related routes eg : sign in , sendotp, signup
const express = require('express');
const router = express.Router();

// controllers

const {sendOtp,signUp,signIn} = require('../controllers/Auth');
const {problemList, addProblem, getProblemById, getCreatedProblemById, editProblem} = require('../controllers/ProblemList');
const {runCode, submitCode, runCodeByIDEWithoutIp, runCodeByIDEWithIp} = require('../controllers/RunCode');
const {addTestCase, removeTestCase} = require('../controllers/AddTestCases');
const {getUserById} = require('../controllers/getUserById');

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
router.post('/runCodeByIDEWithoutIp', runCodeByIDEWithoutIp);
router.post('/runCodeByIDEWithIp', runCodeByIDEWithIp);
router.post('/submitCode', submitCode);
router.post('/getCreatedProblemById', getCreatedProblemById);
router.post('/getUserById', getUserById);
router.post('/editProblem', editProblem);
router.post('/removeTestCase', removeTestCase);

module.exports = router;