var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


/* Google Translate API 
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'ceramics-228616';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'es';

// Translates some text into Russian
translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];

    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
*/

async function translateText(q) {
  console.log("in translateText()!!!!!!!!");
  // Imports the Google Cloud client library
  const projectId = 'ceramics-228616'
  const { Translate } = require('@google-cloud/translate');
  // Instantiates a client
  const translate = new Translate({ projectId });
  // The text to translate is the parameter q
  // The target language
  const target = 'en';
  // Translates some text into Spanish
  const [translation] = await translate.translate(q, target);
  console.log(`Text: ${q}`);
  console.log(`Translation: ${translation}`);
  // Path to private key: ceramics-857511cb22d7.json
}

app.get('/translate/:ChineseText', function (req, res) {
  console.log("in /translate/:ChineseText route in backend!");
  let translation = translateText(req.params.q)
  res.send(translation);
});

// Body Parser Middleware
app.use(bodyParser.json());

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
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'forwords'
});

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});




app.get('/people', function (req, res) {
  console.log("in /people route in backend");
  connection.query('SELECT * FROM Users', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

app.get('/targetLanguage', function (req, res) {
  console.log("in /targetLanguage route in backend");
  connection.query('SELECT TargetLanguage FROM Users WHERE FirstName = "Nikki"', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

app.get('/lesson-list', function (req, res) {
  console.log("in /lesson-list route in backend");
  connection.query('SELECT * FROM lesson;', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

// Gets a single word, for multiplayer
app.get('/word/:lesson/:id', function (req, res) {
  console.log('in /word route in backend');
  var id = req.params.id;
  var lesson = req.params.lesson;
  connection.query('SELECT * FROM Lesson' + lesson + ' WHERE ID = ' + id + ';', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

app.get('/choices/:lesson/:first/:second/:third/:fourth', function (req, res) {
  console.log('in /choices route in backend');
  var lesson = req.params.lesson;
  var first = req.params.first;
  var second = req.params.second;
  var third = req.params.third;
  var fourth = req.params.fourth;
  connection.query('SELECT * FROM Lesson' + lesson + ' WHERE ID in (' + first + ',' + second + ',' + third + ',' + fourth + ');', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

app.get('/lesson-words/:lesson', function (req, res) {
  // console.log('in /lesson-words from backend');
  var lesson = req.params.lesson;
  connection.query('SELECT * FROM Lesson' + lesson + ';', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

//POST API
// app.post('/user', data);
app.post('/user', function (req, res) {
  // res.sendStatus(200);
  // res.send('Post request sent');
  // console.log(res.data);
  var query = "INSERT INTO Users (FirstName,LastName, TargetLanguage) VALUES ('Russ','Tuck','CN'); SELECT * FROM Users;"
  connection.query(query, function (error, results) {
    if (error)
      throw error;
    res.json(results);
  });
});

//PUT API
app.put('/api/user/:id', function (req, res) {
  var query = "UPDATE Users SET LastName = Bjork WHERE FirstName = Russ;"
  //   executeQuery (res, query);
});

// DELETE API
app.delete('/user /:id', function (req, res) {
  var query = "DELETE FROM Users WHERE FirstName=Russ;"
  //   executeQuery (res, query);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
  res.sendStatus(err.status);
  //  res.render('error');
});

module.exports = app;
