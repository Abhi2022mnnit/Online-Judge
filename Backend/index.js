const express = require('express');
const cors = require('cors');
const { generateFile } = require('./generateFile');
const {getCppOutput} = require('./executeCpp');
const app = express();


// Middleware
app.use(cors());            // Let server to know at which port api coming from frontend to server side

app.use(express.json());    // To accept JSON
app.use(express.urlencoded({extended : true}))  // To accept url in encoded form

app.get('/', (req, res) => {
    res.send("Welcome to Our Compiler")
})

app.post('/run', async (req, res) => {
    const {lan = "cpp", code} = req.body;   // If lan is not send by usr, then it will set to cpp by default

    // console.log(req.body);
    if(code === undefined){
      return  res.status(401).json({
            "success" : false,
            message : "Empty Code body"
        })
    }

    try {

            const inputPath = await generateFile(lan, code);
            const output = await getCppOutput(inputPath);
            return res.json({inputPath, output});
    } catch (error) {
        return res.status(500).json({"success" : false, message : "Error in /run : " + error.message})
    }
    
})


app.listen(4000, () => {
    console.log('Server Listening on 4000');
})

