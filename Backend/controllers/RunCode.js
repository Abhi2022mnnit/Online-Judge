const { generateCppFile } = require('./generateCppFile');
const { generateCodeFile } = require('./generateCodeFile');
const { generateInputFile } = require('./generateInputFile');
const problemSchema = require('../models/ProblemSchema');

exports.runCode = async (req, res) => {
    const { lan, code, inputs, problemId } = req.body;
    // console.log(lan, code, inputs, problemId);

    if (!code) {
        return res.status(404).json({ "success": false, message: "Found Code Body Empty at Backend" });
    }

    try {
        const inputFile = await generateInputFile(inputs);
        
        const filePath = await generateCodeFile(lan, code);
        const output = await generateCppFile(filePath, inputFile);

        const problem = await problemSchema.findById({_id : problemId}).populate("testCases").exec();
        const actualCode = problem.code;

        const filePath2 = await generateCodeFile(lan, actualCode);
        const output2 = await generateCppFile(filePath2, inputFile);

        if(output !== output2){
            return res.status(200).json({"success" : false, output, output2, Verdict : "Failed"});
        }

        // if (lan === "cpp") {
        // }

        // else if (lan === "java") {
        //     var output = await generateJavaFile(filePath, inputFile);
        // }
        // else if (lan === "py") {
        //     var output = await generatePythonFile(filePath, inputFile);
        // }
        // else if (lan === "js") {
        //     var output = await generateJavaScriptFile(filePath, inputFile);
        // }

        return res.status(200).json({ "success": true, output, output2, Verdict : "Accepted"});
    } catch (error) {
        return res.status(500).json({ "success": false, message: "Error in /run : " + error.message })
    }

}

exports.submitCode = async (req, res) => {
    const { lan, code, problemId } = req.body;

    // console.log(lan);
    // console.log(code);
    // console.log(problemId);

    try {
        const problemDetails = await problemSchema.findById({ _id : problemId })
            .populate("testCases").exec();

        if (!problemDetails) {
            return res.status(500).json({ "success": false, message : "Server Not found Problem Details in RunCode Page"});
        }

        const filePath = await generateCodeFile(lan, code);


        for (let i = 0; i < problemDetails.testCases.length; i++) {
            const testCase = problemDetails.testCases[i];
            // console.log("TestCase: " + testCase);
            // console.log("I/p: " + testCase.input);
            // console.log("Expected O/p: " + testCase.output);
            const inputFile = await generateInputFile(testCase.input);
            const output = await generateCppFile(filePath, inputFile);

            if (output !== testCase.output) {
                // console.log("O/p: Failed: " + output);
                return res.status(200).json({"success" : false, output, testCase, Verdict : "Failed"});
            }
        }

        return res.status(200).json({ "success": true, Verdict : "Accepted" });

    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });
    }

}