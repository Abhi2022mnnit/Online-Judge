const fs = require('fs');
const path = require('path');
const {exec} = require('node:child_process')

const dirOutput = path.join(__dirname, 'outputs');

if (!fs.existsSync(dirOutput)) {
    fs.mkdirSync(dirOutput, { recursive: true });
}

const generateCppFile = async (filePath, inputFile) => {
    const fileName = path.basename(filePath);   // f80f27b4-1d35-4b18-ae9b-9e62bddb6185.cpp
    const fileId = fileName.split(".")[0];      // split func gives array : ["f80f27b4-1d35-4b18-ae9b-9e62bddb6185", "cpp"]
    const outputFileName = `${fileId}.out`;     // For linux/MAC -> use ".out" extension
    const outFilePath = path.join(dirOutput, outputFileName);
    console.log("FILE " + outFilePath);


    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outFilePath} && cd ${dirOutput} && ./${outputFileName} < ${inputFile}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(Error in Promise);
                    reject(error);
                }
                else if (stderr) {
                    console.log("Std Error in Promise");
                    reject(stderr);
                }
                resolve(stdout);
        });
    });

}


const generateCppFileWithoutIp = async (filePath) => {
    const fileName = path.basename(filePath);   // f80f27b4-1d35-4b18-ae9b-9e62bddb6185.cpp
    const fileId = fileName.split(".")[0];      // split func gives array : ["f80f27b4-1d35-4b18-ae9b-9e62bddb6185", "cpp"]
    const outputFileName = `${fileId}.out`;     // For linux/MAC -> use ".out" extension
    const outFilePath = path.join(dirOutput, outputFileName);
    console.log("FILE " + outFilePath);


    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outFilePath} && cd ${dirOutput} && ./${outputFileName}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(Error in Promise);
                    reject(error);
                }
                else if (stderr) {
                    console.log("Std Error in Promise");
                    reject(stderr);
                }
                resolve(stdout);
        });
    });

}

module.exports = { generateCppFile, generateCppFileWithoutIp };