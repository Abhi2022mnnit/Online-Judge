const mongoose = require("mongoose");

const ProblemsSchema2 = new mongoose.Schema({

    problemName : {
        type : String,
        required: true,
    },

    problemStatement : {
        type : String,
        required : true,
    },

    constraints : {
        type : [String],
        required : true,
    }, 

    testCases : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "TestCases",
    }],
    
    solutionsSubmittedByCoder : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "SolutionsSubmittedByUser",
    }],

    problemCreater : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
});

module.exports = mongoose.model("Problems",ProblemsSchema2);

