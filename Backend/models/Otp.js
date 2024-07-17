const mongoose = require("mongoose");
const {sendMailer} = require('../utils/SendMailer');
const OtpSchema = new mongoose.Schema({
    
    emailAddress : {
        type : String,
        required : true,
        trim : true,
    },

    otp : {
        type: String,
        required : true,
    },

    createdAt : {
        type: Date,
        default : Date.now,
        expires : 60 * 5
    }

});


const emailVerification = async(emailAddress,otp) => {

    try {
         const response = await sendMailer(emailAddress,'otp for email verification',otp);
    }catch(error) {
        console.log("Error at email verification(sending email)",error);
    }

}

// before storing otp we have to send to user
OtpSchema.pre('save',async function(next){

      if(this.isNew)
      {
         await emailVerification(this.emailAddress,this.otp);
      }
      next();
});




module.exports = mongoose.model("Otp",OtpSchema);