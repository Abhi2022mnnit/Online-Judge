const fs = require('fs');
const path = require('path');
const {exec} = require('node:child_process');

const outputPath = path.join(__dirname, 'outputs'); // F:\Web Developing\Chai-aur-React\Compiler\outputs

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive : true});
}


const getCppOutput = async (filepath) => {
    const inputFile = path.basename(filepath); // f80f27b4-1d35-4b18-ae9b-9e62bddb6185.cpp
    const jobId = inputFile.split(".")[0]; // split func gives array : ["f80f27b4-1d35-4b18-ae9b-9e62bddb6185", "cpp"]
    const outputFileName = `${jobId}.exe` // For linux/MAC -> use ".out" extension
    const outputFilePath = path.join(outputPath, outputFileName);
    

    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outputFilePath} && cd ${outputPath} && .\\${outputFileName}`,
            (error, stdout, stderr) => {
            if(error){
                console.log("Error in Promise");
                reject(error);
            }
            else if(stderr){
                console.log("Std-Error in Promise");
                reject(stderr);
            }
            resolve(stdout);
        });
    });
}



module.exports = {getCppOutput};