const express = require('express');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const {connectDb, sessionCollection} = require('./config/db');
const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3001;
const app = express();
connectDb();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
      secret: process.env.SESSION_SECRET || 'Il}/mav@hCn*CK!>""Zx=6?%p&oLgz<y',
      resave: false,
      saveUninitialized: false,
      store: sessionCollection(),
      maxAge: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
    })
  );

app.use('/session', require('./routes/user'));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));