const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({

    problemName : {
        type : String,
        required : true
    },

    difficulty : {
        type : String,
        required : true
    },

    problemDescription : {
        type : String,
        required : true
    },

    constraints : {
        type : [String],
        required : true
    },

    inputDescription : {
        type : String,
        required : true
    },

    outputDescription : {
        type : String,
        required : true
    },

    // sampleInput : [{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "TestCases"
    // }],

    // sampleOutput : [{
    //     type : "mongoose.Schema.Type.ObjectId",
    //     ref : "TestCases"
    // }],

    code : {
        type : String,
        required : true
    }

})


module.exports = mongoose.model("ProblemList", ProblemSchema);