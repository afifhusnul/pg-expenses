const 
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  passport = require('passport'),
  config = require('./app/utils/Setting')

const app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//BodyParser for middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//---------------- Cors --------------
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,PATCH,GET');   
   res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
   //next();
   if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});


// //Passport middleware
app.use(passport.initialize())

// //Passport Config
require('./app/utils/Passport')(passport);


const user = require('./app/controllers/UsersController.js')
const auth = require('./app/controllers/AuthController.js')
// const profile = require('./app/controllers/ProfileController.js')
const gaji = require('./app/controllers/SalaryController.js')
const expenses = require('./app/controllers/ExpensesController.js')

app.use('/api/user', user)
app.use('/api/auth', auth)
// app.use('/api/profile', profile)
app.use('/api/gaji', gaji) 
app.use('/api/expenses', expenses) 


// catch 404 and forward to error handler
app.use(function(req, res, next) {  
   res.status(404).json(config.rest.createResponse(404, false, undefined,'Url API is not found'));
});


// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  next(
      res.json(config.rest.createResponse(500, false, undefined,err))  
    );
  // res.json(config.rest.createResponse(500, false, undefined,'Internal server error'))  
});

module.exports = app;
