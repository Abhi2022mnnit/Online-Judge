const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    firstName : {
        type : String,
        required: true,
        trim: true,
    },
    lastName : {
        type : String,
        required : true,
        trim: true,
    },

    emailAddress : {
        type : String,
        required : true,
        trim : true,
    },

    password : {
        type : String,
        required : true,
    },
    
    image : {
        type: String,
        required: true,
    },

    accountType : {
        type : String,
        enum : ["Admin","Coder"],
        required : true,
    },
    problemsCreated : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Problems",
    }],
    problemsSolved : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Problems",
    }],
    problemsAttempted : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Problems",
    }],
})

module.exports = mongoose.model("User",UserSchema);