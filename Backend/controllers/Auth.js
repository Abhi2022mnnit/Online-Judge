// send otp , signup, login
// functions for connecting with models and apply operations on database
const Otp = require('../models/Otp');
const User = require("../models/UserSchema");
const otp_generator = require("otp-generator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.sendOtp = async (req, res) => {
    try {

        const { emailAddress } = req.body;
        // email address given ?
        if (!emailAddress) {
            return res.status(404).json({
                success: false,
                message: 'enter your email address',
            });
        }


        // find existing user   
        const existUser = await User.findOne({ emailAddress });
        if (existUser) {
            return res.status(401).json({
                success: false,
                message: 'User is already registered',
            });
        }

        //unique otp generation 
        var otp = otp_generator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        var result = await Otp.findOne({ otp: otp });

        while (result) {
            otp = otp_generator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            result = await Otp.findOne({ otp: otp });
        }

        const otpdata = await Otp.create({
            emailAddress,
            otp,
        });

        return res.status(200).json({
            success: true,
            message: 'otp send succcessfully',
            data: otpdata,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error at otp',
        });
    }
}

exports.signUp = async (req, res) => {

    try {
        const {
            userName,
            firstName,
            lastName,
            emailAddress,
            accountType,
            password,
            confirmPassword,
            otp
        } = req.body;

        // console.log(req.body);

        // every detail given ?
        if (!userName || !firstName || !lastName || !emailAddress  || !password || !confirmPassword || !accountType || !otp) {
            return res.status(404).json({
                success: false,
                message: 'enter your details',
            });
        }

        // check user is registered ?
        const exitUser = await User.findOne({ emailAddress: emailAddress });

        if (exitUser) {
            return res.status(401).json({
                success: false,
                message: 'User is already registered',
            });
        }

        //verify password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'password and confirm-password does not match',
            });
        }

        // verifying otp
        const recentOtp = await Otp.find({ emailAddress }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'OTP NOT FOUND',
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'Otp Not valid',
            });
        }


        // password hashing using bcrypt

        const hashedPassword = await bcrypt.hash(password, 12);
        console.log('hh');
        // create the user
        const userdetails = await User.create({
            userName,
            firstName,
            lastName,
            emailAddress,
            accountType,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        });

        return res.status(200).json({
            success: true,
            message: 'registration successfull',
            userdetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error at registration side'

        })
    }

}

exports.signIn = async (req, res) => {
    try {

        const { emailAddress, password } = req.body;

        if (!emailAddress || !password) {
            return res.status(400).json({
                success: false,
                message: 'enter all details',
            });
        }

        const existUser = await User.findOne({ emailAddress: emailAddress });

        if (!existUser) {
            return res.status(404).json({
                success: false,
                message: 'Complete your registeration first',
            });
        }

        if (await bcrypt.compare(password, existUser.password)) {
            // building token 
            const payload = {
                id: existUser._id,
                emailAddress: existUser.emailAddress,
                accountType: existUser.accountType
            }

            var token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            existUser.password = undefined;
            existUser.token = token;

            // building a cookie

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                existUser,
                message: 'Login Successfully',
            })
        } else {
            return res.status(401).json({
                success: false,
                message: 'entered wrong password',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error at signin part'
        })
    }
}
