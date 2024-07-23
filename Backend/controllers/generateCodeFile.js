const fs = require('fs');
const path = require('path')
const {v4:uuid} = require('uuid');

const dirInputs = path.join(__dirname, 'codes');   // F:\Web_Developing\Online_Judge\Backend\utils\codes

if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs, {recursive : true});
}

const generateCodeFile = async(lan, input) => {
    const fileId = uuid();
    const fileName = `${fileId}.${lan}`;
    const filePath = path.join(dirInputs, fileName);
    await fs.writeFileSync(filePath, input);

    return filePath;
}

module.exports = {generateCodeFile}