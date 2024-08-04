const mongoose = require('mongoose');
require('dotenv').config({path : '.env'})


const dbConnect = () => {
    mongoose.connect(process.env.mongoURL)
    .then(() => console.log('database connected'))
    .catch((error) => console.log('database not connected',error))
}

module.exports = dbConnect;