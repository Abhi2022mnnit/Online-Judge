const problemList = require('../models/ProblemSchema');


exports.problemList = async(req, res) => {
    try{
        const allProblems = await problemList.find({});
        if(!allProblems){
            return res.status(404).json({"success" : false, message : "Problems Not Fetched."})
        }
        return res.json({"success" : true, message : "fetched all problem successfully", allProblems});
    }catch(error){
        return res.status(500).json({"success" : false, message : `Error in Fetching Problems : ${error.message}`});
    }
}

exports.addProblem = async(req,res) => {
    try{
        const {problemName, difficulty, problemDescription, constraints, inputDescription, outputDescription, code} = req.body;
        if(!problemName || !difficulty || !problemDescription || !constraints || !inputDescription || !outputDescription || !code){
            console.log(problemName, difficulty, problemDescription, constraints, inputDescription, outputDescription, code);
            return res.status(404).json({"success" : false, message : "Cannot fetch data from body"})
        }
        
        await problemList.create({
            problemName,
            difficulty,
            problemDescription,
            constraints,
            inputDescription,
            outputDescription,
            code
        })

        return res.status(200).json({"success" : true, message : "Problem added successfully"});
    }catch(error){
        return res.status(500).json({"success" : false, message : `Error in Fetching Problems : ${error.message}`});
    }
}