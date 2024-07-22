const express = require('express')
const authRoutes = require('./routes/Auth');
const dbConnect = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// --------------------------- Middlewares ------------------------------------------
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use('/api/phase1/auth', authRoutes);

//------------------------------------------------------------------------------------

dbConnect();

app.listen(4000,() => {
    console.log('listen on 4000');
})
