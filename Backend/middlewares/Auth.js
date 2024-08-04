// token will verify here 
// checking the role of admin and coder basis on token
const jwt = require('jsonwebtoken');
// const jwtDecode = require('jwt-decode');
require('dotenv').config();
 
exports.auth = async(req,res,next) => {
    try {
        console.log("first")
        const token = req.cookies.token || req.body.token || req.headers("Authorisation").replace("Bearer ","");
        console.log("Token : " + token);
        if(!token)
        {
            return res.status(400).json({
                success : false,
                message : 'token is missing',
            })
        }

        // verify token
        try {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodeToken;

            console.log("USer : " + req.user);
            console.log("User Id : " + req.user.id);

        }catch(error){
            return res.status(401).json({
                success: false,
                message: 'token has not been decoded',
            });           
        }    
        
        next();

    }catch(error){
        return res.status(500).json({
            success: false,
            message : 'not a valid user',
        })
    }
}


exports.isAdmin = async(req,res,next) =>{
    try {

        if(req.user.accountType !== "Admin")
        {
            return res.status(400).json({
                success: false,
                message : 'protected route for admin only',
            });
        }
        next();
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'Admin role is not verified',
        })
    }
}

exports.isCoder = async(req,res,next) =>{
    try {

        if(req.user.accountType !== "Coder")
        {
            return res.status(400).json({
                success: false,
                message : 'protected route for coder only',
            });
        }

        next();
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'coder role is not verified',
        })
    }
}