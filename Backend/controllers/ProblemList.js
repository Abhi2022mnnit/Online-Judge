const ProblemSchema = require('../models/ProblemSchema');
const problemList = require('../models/ProblemSchema');
const User = require('../models/UserSchema');

exports.problemList = async (req, res) => {
    try {

        const allProblems = await problemList.find({});
        if (!allProblems) {
            return res.status(200).json({ "success": false, message: "Problems Not Found at Server." })
        }
        return res.json({ "success": true, message: "fetched all problemsuccessfully", allProblems });
    } catch (error) {
        return res.status(500).json({ "success": false, message: `Error in Fetching Problems : ${error.message}` });
    }
}


exports.getProblemById = async (req, res) => {
    try {
        const { problemId } = req.body;
        console.log(problemId);
         const getProblem = await problemList.findById(problemId).populate('testCases').exec();
        if(!getProblem){
            throw new Error("Unable to fetch problem by Id from database");
        }
        // console.log(getProblem);
        return res.status(200).json({ "success": true, getProblem });
    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });
    }
}




exports.addProblem = async (req, res) => {
    try {
        const { problemName, difficulty, problemDescription, constraints, inputDescription, outputDescription, code } = req.body;
        const coderId = req.user.id;

        console.log(req.body);

        if (!problemName || !difficulty || !problemDescription || !constraints || !inputDescription || !outputDescription || !code) {
            console.log(problemName, difficulty, problemDescription, constraints, inputDescription, outputDescription, sampleOutput, sampleOutput, code);
            return res.status(404).json({ "success": false, message: "Cannot fetch data from body" })
        }

        const problem = await problemList.create({
            problemName,
            difficulty,
            problemDescription,
            constraints,
            inputDescription,
            outputDescription,
            code
        })

        const userDetails = await User.findByIdAndUpdate({ _id: coderId },
            {
                $push: {
                    problemsCreated: problem._id,
                }
            },
            {
                new: true
            }
        );

        console.log(userDetails);

        // const userDet = await Us.findByIdandUpdate(
        //                         {_id : coderId},
        //                         {
        //                             $push : {
        //                                 cretaedPro : problem._id,
        //                             }
        //                         },
        //                         {new : true}
        // );

        return res.status(200).json({ "success": true, message: "Problem added successfully", problem });
    } catch (error) {
        return res.status(500).json({ "success": false, message: `Error in Fetching Problems : ${error.message}` });
    }
}

exports.getCreatedProblemById = async (req, res) => {
    const { problemId } = req.body;
    try {
        const problemDetails = await ProblemSchema.findById({ _id: problemId })
            .populate("testCases").exec();

        if (!problemDetails) {
            throw new Error("Error in getting Created problem")
        }
        return res.status(200).json({ "success": true, problemDetails });
    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });
    }
}

exports.editProblem = async (req, res) => {

    try {
        const { problemName, difficulty, problemDescription, inputDescription, outputDescription, code, constraints, problemId } = req.body;
        const problemDetails = await ProblemSchema.findByIdAndUpdate({ _id: problemId }, {
            problemName: problemName,
            difficulty: difficulty,
            problemDescription: problemDescription,
            constraints: constraints,
            inputDescription: inputDescription,
            outputDescription: outputDescription,
            code: code
        }).populate("testCases").exec();

        return res.status(200).json({ "success": true, problemDetails });
    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });
    }
}

exports.editProblem = async (req, res) => {

    try {
        const { problemName, difficulty, problemDescription, inputDescription, outputDescription, code, constraints, problemId } = req.body;
        const problemDetails = await ProblemSchema.findByIdAndUpdate({ _id: problemId }, {
            problemName: problemName,
            difficulty: difficulty,
            problemDescription: problemDescription,
            constraints: constraints,
            inputDescription: inputDescription,
            outputDescription: outputDescription,
            code: code
        }).populate("testCases").exec();

        return res.status(200).json({ "success": true, problemDetails });
    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });
    }
}

