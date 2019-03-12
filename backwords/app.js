//  require() method is for load and cache js modules
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });


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
// account needed for connecing to our sql database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'nadevai',
  password: 'chinese',
  database: 'forwords'
});
// connection function
connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});
// get API
// it only retrieve information only
// what we would see when we go to our database
app.get('/', function (req, res) {
  res.send("Welcome to forwords");
});

app.get('/people', function (req, res) {
  console.log("in /people route in backend");
  connection.query('SELECT * FROM Users', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})
// language of what a user wants to study
app.get('/targetLanguage', function (req, res) {
  console.log("in /targetLanguage route in backend");
  connection.query('SELECT TargetLanguage FROM Users WHERE FirstName = "Nikki"', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})
// list of lessons
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
// Gets 4 choices for users to choose from in the gamePlay
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
  console.log('in /lesson-words from backend');
  var lesson = req.params.lesson;
  console.log('url param lesson: ', lesson);
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

// Multiplayer Connection Code
// Author: Ezekiel Martinez with assistance from Stephen Macomber
// Summary: Allows for Multiplayer Gameplay
// Description:
// This is the code that allows players to connect and play a game 
// with each other via database. This is avheived through the use
// of Websockets (ws). Initializes a connection with user/client,
// and then has multiple different cases for the types of message
// it could receive from a client. The code keeps track of existing group
// through a map, and then indexs through the possible groupID in order
// to locate the correct group.

// Initialize variables neccessary for storing player data
var groups = new Map();
var groupCode = 0;
var index = 0;
var readyCounter = 0; // This variable is not sustainable for multiple players at once
// Connect to client via ws, log the proxess of receiving and sending messages
// or client
wss.on('connection', (ws, req) => {
  console.log('Connection accepted:', req.connection.remoteAddress.replace(/.*:/, ''));
  ws.on("message", message => {
    console.log(`Received message: ${message}`);

    if (message == 'create') {
      var players = [];
      groupCode++; // group code generation function.
      groups.set(groupCode, players)
      index = groups.get(groupCode).push(ws) - 1;
      groups.get(groupCode)[index].send(groupCode);
      // send code to client for it to be displayed for other users
    }
    else {
      //Check to see what group the message is being sent from.
      if (message.includes('join')) {
        groupID = parseInt(message.substr(4, message.length));
        index = groups.get(groupID).push(ws) - 1;
        groups.get(groupID)[index].send('You are now in a group!');
        // Alert other players that another player has joined group, unneeded for finished product.
        for (var i = 0; i < groups.get(groupID).length - 1; i++) {
          groups.get(groupID)[i] && groups.get(groupID)[i].send('New player has joined!');
        }
        console.log('Current Connections for this group: ' + groups.get(groupID).length);
      }
      else if (message.includes('ready')) {
        groupID = parseInt(message.substr(5, message.length));
        readyCounter++;
        if (readyCounter == groups.get(groupID).length) {
          readyCounter = 0;
          for (var i = 0; i < groups.get(groupID).length; i++) {
            groups.get(groupID)[i] && groups.get(groupID)[i].send('Game is starting!');
          }
          // Push all of the details about this group into the group table
          // Start getting words for game and loading Gameplay logic
        }
      }
    }
  }
  );
ws.on('close', () => {
  console.log(`Client #${index} has disconnected`);
  delete clients[index];
  var i = clients.length - 1;
  while (clients[i] === undefined && i >= 0) {
    clients.pop();
    i--;
  }
})
})
module.exports = app;
