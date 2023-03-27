const express = require('express');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/db');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3001;
const app = express();
connectDb();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

// test 
app.use('/', (req, res, next)=>{
    res.send('<h1> Welcome to out Restaurant </h1>')
})
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));