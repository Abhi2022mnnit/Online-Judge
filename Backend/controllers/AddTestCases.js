const TestCaseSchema = require('../models/TestcasesSchema');
const problemSchema = require('../models/ProblemSchema');

exports.addTestCase = async (req, res) => {

    const { input, output, problemId } = req.body;

    try{
        const testCase = await TestCaseSchema.create({input, output, problemId});
        const problem = await problemSchema.findByIdAndUpdate({_id : problemId},
            {
                $push : {
                    testCases : testCase._id
                }
            },
            {
                new : true
            }
        );

        return res.json({input, output, problemId, problem});
    }catch(error){
        return res.status(500).json({"success" : false, message : error.message});
    }
}
