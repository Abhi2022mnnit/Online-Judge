import React from 'react'
import apiConnect from '../apiServices/apiConnect';

export const sendOtp = async(emailAddress, otpNavigate) => {
    try{

        const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/sendOtp", {emailAddress})

        if(!promise.data.success){
            throw new error("Error in sending API request to send OTP from frontend")
        }

        otpNavigate('/OtpPage')
    }catch(error){
        console.log(error.message);
    }

}