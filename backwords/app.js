var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Body Parser Middleware
app.use(bodyParser.json()); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/people');

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
     next();
   });
   
//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'forwords'
});

connection.connect(function(err) {
	if (err) {
		console.error('Error connecting: ' + err.stack);
		return;
	}
	console.log ('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM users', function (error, results, fields) {
	if (error)
		throw error;
	results.forEach(result => {
		console.log(result);
	});
});

connection.end();
// var  executeQuery = function(res, query){             
//   connection.connect(dbConfig, function (err) {
//     if (err) {   
//       console.log("Error while connecting database :- " + err);
//       res.send(err);
//     }
//     else {
      // create Request object
//       var request = new sql.Request();
      // query to the database
//       request.query(query, function (err, res) {
//         if (err) {
//           console.log("Error while querying database :- " + err);
//           res.send(err);
//         }
//         else {
//           res.send(res);
//         }
//       });
//     }
//   });
// }

//GET API
// app.get("/api/user", function(req , res){
//   var query = "SELECT * FROM users;";
//   executeQuery (res, query);
// });

//POST API
app.post("/api/user", function(req , res){
  var query = "INSERT INTO users (FirstName,LastName) VALUES ('Russ','Tuck');" 
//   executeQuery (res, query);
});

//PUT API
app.put("/api/user/:id", function(req , res){
  var query = "UPDATE users SET LastName = Bjork WHERE FirstName = Russ;"
//   executeQuery (res, query);
});

// DELETE API
app.delete("/api/user /:id", function(req , res){
  var query = "DELETE FROM users WHERE FirstName=Russ;"
//   executeQuery (res, query);
});

// app.get("/url", (req, res, next) => {
//   res.json(["Tony","Lisa","Michael","Ginger","Food"]);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
