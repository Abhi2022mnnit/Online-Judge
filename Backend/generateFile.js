const fs = require('fs');
const path = require('path');
const { v4 : uuid } = require('uuid');


const dirCodes = path.join(__dirname, 'codes'); //F:\Web Developing\Chai-aur-React\Compiler\codes

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive : true}); // To make folders recursively
}


const generateFile = async (lan, code) => {
    const jobId = uuid();
    const filename = `${jobId}.${lan}`; // 19f187c4-02f1-4a94-a5ea-0aae63ba071a.cpp
    const filePath = path.join(dirCodes, filename); //F:\Web Developing\Chai-aur-React\Compiler\codes\19f187c4-02f1-4a94-a5ea-0aae63ba071a.cpp
    fs.writeFileSync(filePath, code);
    return filePath;
}

module.exports = {generateFile};