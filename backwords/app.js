//  require() method is for load and cache js modules
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var wsPort = 4444;
var httpPort = 6666;

// WebSocket
const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: wsPort })

// Global variables
var allWordsInLesson = [];

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
var server = app.listen(process.env.PORT || httpPort, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
  console.log("WebSocket running on port", wsPort);
});
// account needed for connecing to our sql database
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
// get API
// it only retrieve information only
// what we would see when we go to our database
app.get('/', function (req, res) {
  res.send("Welcome to forwords");
});

class Player {
  constructor(ID, name, choices, prompt) {
    this.ID = ID;
    this.name = name;
    this.choices = choices;
    this.prompt = prompt;
  }
  setPromptChoices(choices) {
    this.choices = choices;
    // this.prompt = choices[Math.floor(Math.random() * 4)];
    this.prompt = choices;

  }
}

class Game {
  constructor(lesson, players) {
    this.lesson = lesson;
    this.players = players;
  }
  initGame() {
    for (var n = 0; n < 2; n++) {

      this.players[n].setPromptChoices(getChoices(this.lesson));
      console.log(this.players[n].choices[0]);
      console.log(this.players[n].choices[1]);
      console.log(this.players[n].choices[2]);
      console.log(this.players[n].choices[3]);
      console.log(this.players[n].prompt)
    }
  }
}

// WebSocket
/*
ws.on('connection', function connection(ws, req) {
  console.log('Connection accepted:', req.connection.remoteAddress.replace(/.*:/, ''));
  ws.on('message', function incoming(message) {
    // Turn every received message into a JSON immediately to access it!
    let receivedMessage = JSON.parse(message);
    startGame();

    // If the client is requesting choices and a prompt
    if (receivedMessage[0].request == 'choicesAndPrompts') {
      let lesson = receivedMessage[0].lesson;
      populateChoicesAndPrompt(ws, lesson);
    }
    if (receivedMessage[0].request == 'create') {
      // createGame()
    }

  });
});
*/

function startGame() {
  //connection established, assume moving on from Jake's screen.
  initList = [];
  p1 = new Player(1, "Jake", initList, 'init');
  p2 = new Player(2, "Nikki", initList, 'init');
  lesson = 11;
  let players = [p1, p2];
  let newGame = new Game(lesson, players);
  newGame.initGame();
}

class Player {
  constructor(ID, name, choices, prompt) {
    this.ID = ID;
    this.name = name;
    this.choices = choices;
    this.prompt = prompt;
  }
  // constructor(ID, name) {
  //   this.ID = ID;
  //   this.name = name;
  // }
  setPromptChoices(choices) {
    this.choices = choices;
    this.prompt = choices[Math.random() * 4];
  }
}

class Game {
  constructor(lesson, players) {
    this.lesson = lesson;
    this.players = players;
  }
  initGame() {
    for (n = 0; n < 2; n++) {
      // connection.query('SELECT * FROM word WHERE lesson = ' + this.lesson + ';', function (error, results) {
      //   if (error)
      //     throw error;
      //   let minID = results[0].ID;
      //   let numList = fourWordsPicker(minID, (results.length - 1)); // return an array of 4 unique numbers

      //   // Get a random int between 1 and 4 to use that as the index of the word that will be the prompt
      //   // Get a random int between 1 and 4 to use that as the index of the word that will be the prompt
      //   var randomInt = Math.floor(Math.random() * 4) + 1;
      //   // Get full choices of these choices and prompt and put them in an array
      //   var choices = [];
      //   for (var i = 0; i < results.length; i++) {
      //     for (var j = 0; j < numList.length; j++) {
      //       if (results[i].ID == numList[j]) {
      //         choices.push(results[i]);
      //       }
      //     }
      //   }
      //   players[n].setPromptChoices(choices);
      // }
      players[n].setPromptChoices(getChoices);
      console.log(players[n].choices[0]);
      console.log(players[n].choices[1]);
      console.log(players[n].choices[2]);
      console.log(players[n].choices[3]);
      console.log(players[n].prompt)
    }
  }
}

//Generate a random number between the minimum ID in that lesson and the maximum ID in that lesson
function randomNumGen(minID, lessonWordsCount) {
  let maxID = minID + lessonWordsCount;
  return Math.floor(Math.random() * (maxID - minID) + minID);
}

/* Create a list of 4 unique numbers
 * If a number is already in the list, then generate a unique number
 */
function fourWordsPicker(minID, lessonWordsCount) {
  let numList = [];
  while (numList.length < 4) {
    let potential = Math.floor(randomNumGen(minID, lessonWordsCount));
    while (numList.includes(potential)) {
      potential = randomNumGen(minID, lessonWordsCount);
    }
    numList.push(potential);
  }
  return numList; // should be 4 random numbers between minID and maxID
}

function startGame() {
  //connection established, assume moving on from Jake's screen.
  p1 = new Player(1, Jake);
  p2 = new Player(2, Nikki);
  lesson = 11;
  let players = [p1, p2];
  let newGame = new Game(lesson, players);
  newGame.initGame();
}

// Send choices and prompt to client
function getChoices(lesson) {
  connection.query('SELECT * FROM word WHERE lesson = ' + lesson + ';', function (error, results) {
    if (error)
      throw error;
    let minID = results[0].ID;
    let numList = fourWordsPicker(minID, (results.length - 1)); // return an array of 4 unique numbers

    // Get full choices of these choices and put them in an array
    var choices = [];
    for (var i = 0; i < results.length; i++) {
      for (var j = 0; j < numList.length; j++) {
        if (results[i].ID == numList[j]) {
          choices.push(results[i])
        }
      }
    }
    // Add send header of "choicesAndPrompt" at element 0
    // choices.unshift("choicesAndPrompt");

    // Put prompt at the end of the array
    // choices.push(choices[randomInt]);

    // Stringify the choices to send them to the client
    // var choicesAndPrompt = JSON.stringify(choices);
    // Send it to the client
    // ws.send(choicesAndPrompt);
    return choices;
    // Reset all of the arrays
    // choicesAndPrompt = [];
  });
}

//Generate a random number between the minimum ID in that lesson and the maximum ID in that lesson
function randomNumGen(minID, lessonWordsCount) {
  let maxID = minID + lessonWordsCount;
  return Math.floor(Math.random() * (maxID - minID) + minID);
}

/* Create a list of 4 unique numbers
 * If a number is already in the list, then generate a unique number
 */
function fourWordsPicker(minID, lessonWordsCount) {
  let numList = [];
  while (numList.length < 4) {
    let potential = Math.floor(randomNumGen(minID, lessonWordsCount));
    while (numList.includes(potential)) {
      potential = randomNumGen(minID, lessonWordsCount);
    }
    numList.push(potential);
  }
  return numList; // should be 4 random numbers between minID and maxID
}

// HTTP
// Display welcome message 
app.get('/', function (req, res) {
  res.send("Welcome to forwords");
});

// returns the list of lessons
app.get('/lesson-list', function (req, res) {
  console.log("in /lesson-list route in backend");
  connection.query('SELECT * FROM lesson;', function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
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
ws.on('connection', (ws, req) => {
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
            groups.get(groupID)[i] && groups.get(groupID)[i].send('Game is about to start!');
          }
          // Push all of the details about this group into the group table
          // Start getting words for game and loading Gameplay logic
        }
      }
    }
  })
});

ws.on('close', () => {
console.log(`Client #${index} has disconnected`);
delete clients[index];
var i = clients.length - 1;
while (clients[i] === undefined && i >= 0) {
clients.pop();
i--;
}
})

module.exports = app;
