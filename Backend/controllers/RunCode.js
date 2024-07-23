const {generateCppFile} = require('./generateCppFile');
const {generateCodeFile} = require('./generateCodeFile');
const {generateInputFile} = require('./generateInputFile');

exports.runCode = async (req, res) => {
    const { lan, code, inputs } = req.body;
    console.log(lan, code, inputs);

    if (!code) {
        return res.status(404).json({ "success": false, message: "Found Code Body Empty at Backend" });
    }

    try {
        const filePath = await generateCodeFile(lan, code);
        const inputFile = await generateInputFile(inputs);
        
        console.log("FAFD: " + filePath);
        console.log("I/P :" + inputFile);
        const output = await generateCppFile(filePath, inputFile);

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

        return res.status(200).json({ "success": true, filePath, inputFile, output });

    }catch(error){
        return res.status(500).json({"success" : false, message : "Error in /run : " + error.message})
    }

}