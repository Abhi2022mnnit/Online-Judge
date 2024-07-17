const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema({

    coderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    problemId  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Problems",
    },
    verdict : {
        type : String,
        enum : ["Accepted","Wrong Answer"],
    },
    submitted_at : {
        type: Date,
        default: date.now,
    },
})

module.exports = mongoose.model("SolutionsSubmittedByUser",SolutionSchema);
