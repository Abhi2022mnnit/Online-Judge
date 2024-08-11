const express = require('express')
const authRoutes = require('./routes/Auth');
const dbConnect = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// --------------------------- Middlewares ------------------------------------------
const app = express()
const corsOptions ={
    origin:'https://online-judge-kappa.vercel.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/phase1/auth', authRoutes);

//------------------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
    console.log(`listen on ${PORT}`);
})
