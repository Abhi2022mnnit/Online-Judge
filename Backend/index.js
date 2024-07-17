const express = require('express')
const app = express()

app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.listen(3000,() => {
    console.log('listen on 3000');
})

const dbConnect = require('./config/database');
dbConnect();

const authRoutes = require('./routes/Auth');
app.use('/api/phase1/auth', authRoutes);
