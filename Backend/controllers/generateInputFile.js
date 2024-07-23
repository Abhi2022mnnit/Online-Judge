const fs = require('fs');
const path = require('path')
const {v4:uuid} = require('uuid');

const dirInputs = path.join(__dirname, 'inputs');   // F:\Web_Developing\Online_Judge\Backend\utils\inputs

if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs, {recursive : true});
}

const generateInputFile = async(input) => {
    const fileId = uuid();
    const fileName = `${fileId}.txt`;
    const filePath = path.join(dirInputs, fileName);
    await fs.writeFileSync(filePath, input);

    return filePath;
}

module.exports = {generateInputFile}
