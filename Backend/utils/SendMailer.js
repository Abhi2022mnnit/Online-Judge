// function for send emails to a given address

const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendMailer = async(email,title,body) => {
        try {
              let transporter = nodemailer.createTransport({
                service: "gmail",
                port : 465,
                secure : true,
                logger : true,
                debug : true,
                secureconnection: false,
                auth : {
                    user : process.env.mailUser,
                    pass : process.env.mailPassword,
                },
                tls: {
                    rejectUnauthorized : true,
                }
            });

           let info = transporter.sendMail({
                from: process.env.mailUser,
                to :`${email}`,
                subject : `${title}`,
                html : `${body}`,
           }); 

           return info;
        }catch(error) {
            console.log("error at mailing side",error);
        }
}