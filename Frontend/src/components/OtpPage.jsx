import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import apiConnect from '../apiServices/apiConnect';
import OtpInput from "react-otp-input";
import {useNavigate} from 'react-router-dom'


function OtpPage() {
    const [otp, setOtp] = useState('');
    const user = useSelector((state) => state.theUser)

    const loginNavigate = useNavigate('');

    const handleSubmit = async (e) => {
        console.log("User has entered :" + otp);
        setOtp('')

        const body = {
            ...user,
            otp
        }

        // OR 
        // Meth-1)
        // const body = user;
        // body.otp = otp  (or body[otp] = otp like map in c++)

        console.log(body);
        try {
            await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/signup", body)
                .then(
                    res => console.log(res.data)
                )
            
            loginNavigate('/login');

        } catch (error) {
            console.log("Error in sending OTP API to server" + error.message);
        }

             

    }

    return (

        <div className='flex-col w-full h-full item-center justify-between my-7'>
            <div className='m-2'>
                <h2>Enter Verification Code</h2>
                <OtpInput
                    value={otp}
                    onChange={(otp) => setOtp(otp)}
                    numInputs={6}
                    separator={<span style={{ width: "8px" }}></span>}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    inputStyle={{
                        border: "1px solid #CFD3DB",
                        borderRadius: "8px",
                        width: "54px",
                        height: "54px",
                        fontSize: "12px",
                        color: "#000",
                        fontWeight: "400",
                        caretColor: "blue"
                    }}
                    focusStyle={{
                        border: "1px solid #CFD3DB",
                        outline: "none"
                    }}
                    renderInput={(props) => <input {...props} />}
                />
            </div>
            <button type='submit'
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                onClick={handleSubmit}>Submit
            </button>
        </div>
    );
}

export default OtpPage