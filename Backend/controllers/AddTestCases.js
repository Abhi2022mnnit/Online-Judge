const TestCaseSchema = require('../models/TestcasesSchema');
const problemSchema = require('../models/ProblemSchema');

exports.addTestCase = async (req, res) => {

    const { input, output, problemId } = req.body;

    try {
        const testCase = await TestCaseSchema.create({ input, output, problemId });
        const problem = await problemSchema.findByIdAndUpdate({ _id: problemId },
            {
                $push: {
                    testCases: testCase._id
                }
            },
            {
                new: true
            }
        ).populate("testCases").exec();
<<<<<<< HEAD

        return res.json({ "success": true, input, output, problem });
    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });
    }
}

exports.removeTestCase = async (req, res) => {
    try {
        const element = req.body;
        const testCaseDetails = await TestCaseSchema.findByIdAndDelete({ _id: element._id });
        const problemDetails = await problemSchema.findByIdAndUpdate({ _id: element.problemId },
            {
                $pull: {
                    testCases: element._id
                }
            },
            {
                new: true
            }).populate("testCases").exec();

        return res.status(500).json({ "success": true, problemDetails });

    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });

=======

        return res.json({ "success": true, input, output, problem });
    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });
>>>>>>> 5.0
    }
}

exports.removeTestCase = async (req, res) => {
    try {
        const element = req.body;
        const testCaseDetails = await TestCaseSchema.findByIdAndDelete({ _id: element._id });
        const problemDetails = await problemSchema.findByIdAndUpdate({ _id: element.problemId },
            {
                $pull: {
                    testCases: element._id
                }
            },
            {
                new: true
            }).populate("testCases").exec();

        return res.status(500).json({ "success": true, problemDetails });

    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });

    }
}