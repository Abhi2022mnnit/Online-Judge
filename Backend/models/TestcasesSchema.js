const mongoose = require("mongoose");

const TestcasesSchema = new mongoose.Schema({

    input : {
        type : String,
        required: true,
    },

    output : {
        type : String,
        required: true,
    },

    problemId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Problems",
    },
});

module.exports = mongoose.model("Testcases",TestcasesSchema);